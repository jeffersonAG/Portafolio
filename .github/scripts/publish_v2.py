"""Publish built V2 under preview-v2/ while preserving the original Pages site."""

import base64
import json
import os
from pathlib import Path
import re
import subprocess
import sys


TARGET = "preview-v2"
SOURCE_BRANCH = "portfolio-v2"


class PublishError(RuntimeError):
    pass


def gh_api(path, payload=None, method="GET"):
    command = ["gh", "api", "--method", method, "-H", "Accept: application/vnd.github+json", path]
    if payload is not None:
        command += ["--input", "-"]
    result = subprocess.run(
        command,
        input=json.dumps(payload) if payload is not None else None,
        capture_output=True,
        text=True,
        check=False,
    )
    if result.returncode:
        raise PublishError(result.stderr.strip() or f"GitHub API failed: {path}")
    return json.loads(result.stdout) if result.stdout.strip() else None


def validate_pages(pages):
    source = pages.get("source") or {}
    if pages.get("build_type", "legacy") != "legacy":
        raise PublishError("Existing Pages site uses another deployment method; no site files were changed.")
    publishing_branch = source.get("branch")
    if not publishing_branch or source.get("path") != "/":
        raise PublishError(f"Expected an existing Pages branch at /. Actual source: {source}. No site files were changed.")
    base_url = pages.get("html_url", "")
    if not base_url.startswith("https://"):
        raise PublishError("An existing HTTPS Pages URL is required.")
    return base_url.rstrip("/") + "/" + TARGET + "/", publishing_branch


def tree_map(tree):
    if tree.get("truncated"):
        raise PublishError("Cannot validate an incomplete Git tree.")
    return {item["path"]: (item["mode"], item["type"], item["sha"]) for item in tree["tree"]}


def assert_original_site_unchanged(before, after, target_sha):
    old = tree_map(before)
    new = tree_map(after)
    old.pop(TARGET, None)
    target = new.pop(TARGET, None)
    if old != new or target != ("040000", "tree", target_sha):
        raise PublishError("Publication would modify original site files; refusing to update the publishing branch.")


def artifact_files(directory):
    directory = Path(directory)
    if directory.is_symlink():
        raise PublishError("The site artifact cannot be a symbolic link.")
    root = directory.resolve()
    if not (root / "index.html").is_file():
        raise PublishError("Built V2 index.html is missing.")
    files = []
    for path in sorted(root.rglob("*")):
        if path.is_symlink():
            raise PublishError("Site artifacts must not contain symbolic links.")
        if path.is_file():
            files.append((path.relative_to(root).as_posix(), path.read_bytes()))
    if not dict(files).get("index.html"):
        raise PublishError("Built V2 index.html is empty.")
    return files


def assert_current_source(api, repo, source_sha):
    source_commit = api(f"repos/{repo}/git/commits/{source_sha}")
    latest_ref = api(f"repos/{repo}/git/ref/heads/{SOURCE_BRANCH}")
    latest_sha = latest_ref["object"]["sha"]
    if latest_sha == source_sha:
        return
    latest_commit = api(f"repos/{repo}/git/commits/{latest_sha}")
    source_tree = tree_map(api(f"repos/{repo}/git/trees/{source_commit['tree']['sha']}"))
    latest_tree = tree_map(api(f"repos/{repo}/git/trees/{latest_commit['tree']['sha']}"))
    # The other workflow may commit preview/ after this build. That is safe;
    # changes to the source or its images must wait for the newer build.
    for path in ("v2", "IMAGE"):
        if source_tree.get(path) != latest_tree.get(path):
            raise PublishError("Newer V2 source exists; refusing to publish an older build.")


def publish(repo, source_sha, directory, api=gh_api):
    if not re.fullmatch(r"[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+", repo):
        raise PublishError("Invalid repository name.")
    if not re.fullmatch(r"[0-9a-f]{40}", source_sha):
        raise PublishError("Invalid source revision.")
    pages = api(f"repos/{repo}/pages")
    print(f"Existing Pages source: {json.dumps(pages.get('source'))}")
    public_url, publishing_branch = validate_pages(pages)
    files = artifact_files(directory)
    assert_current_source(api, repo, source_sha)
    entries = []
    for path, content in files:
        blob = api(f"repos/{repo}/git/blobs", {
            "content": base64.b64encode(content).decode("ascii"),
            "encoding": "base64",
        }, method="POST")
        entries.append({"path": path, "mode": "100644", "type": "blob", "sha": blob["sha"]})
    site_tree = api(f"repos/{repo}/git/trees", {"tree": entries}, method="POST")["sha"]

    for attempt in range(3):
        main_sha = api(f"repos/{repo}/git/ref/heads/{publishing_branch}")["object"]["sha"]
        commit = api(f"repos/{repo}/git/commits/{main_sha}")
        old_tree = api(f"repos/{repo}/git/trees/{commit['tree']['sha']}")
        if tree_map(old_tree).get(TARGET) == ("040000", "tree", site_tree):
            print("Stable V2 files are already up to date.")
            break
        new_tree_sha = api(f"repos/{repo}/git/trees", {
            "base_tree": commit["tree"]["sha"],
            "tree": [{"path": TARGET, "mode": "040000", "type": "tree", "sha": site_tree}],
        }, method="POST")["sha"]
        new_tree = api(f"repos/{repo}/git/trees/{new_tree_sha}")
        assert_original_site_unchanged(old_tree, new_tree, site_tree)
        assert_current_source(api, repo, source_sha)
        new_commit = api(f"repos/{repo}/git/commits", {
            "message": f"deploy(v2): refresh stable preview from {source_sha[:12]}",
            "tree": new_tree_sha,
            "parents": [main_sha],
        }, method="POST")["sha"]
        try:
            api(f"repos/{repo}/git/refs/heads/{publishing_branch}", {
                "sha": new_commit, "force": False,
            }, method="PATCH")
            main_sha = new_commit
            break
        except PublishError:
            latest = api(f"repos/{repo}/git/ref/heads/{publishing_branch}")["object"]["sha"]
            if attempt == 2 or latest == main_sha:
                raise
            print("The publishing branch advanced; retrying without overwriting its changes.")

    # GITHUB_TOKEN commits alone do not start a legacy Pages build. Request
    # the normal build explicitly, keeping the existing Pages settings.
    api(f"repos/{repo}/pages/builds", {}, method="POST")
    print(f"Original site files preserved. Publishing branch: {publishing_branch}. Published revision: {main_sha}")
    print(f"Stable V2 URL: {public_url}")
    return public_url, main_sha


def main():
    try:
        public_url, main_sha = publish(
            os.environ.get("GITHUB_REPOSITORY", ""),
            os.environ.get("SOURCE_SHA", ""),
            sys.argv[1] if len(sys.argv) > 1 else "stable-dist",
        )
        summary = os.environ.get("GITHUB_STEP_SUMMARY")
        if summary:
            with open(summary, "a", encoding="utf-8") as output:
                output.write(f"V2 stable preview: {public_url}\n\nOriginal site files preserved. Revision: `{main_sha}`.\n")
    except (PublishError, OSError) as error:
        print(f"Publication stopped: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
