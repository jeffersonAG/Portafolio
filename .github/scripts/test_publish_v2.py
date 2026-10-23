import copy
from pathlib import Path
import tempfile
import unittest

from publish_v2 import (
    PublishError, artifact_files, assert_current_source,
    assert_original_site_unchanged, publish, validate_pages,
)


def git_tree(**entries):
    return {"tree": [
        {"path": name, "mode": mode, "type": kind, "sha": sha}
        for name, (mode, kind, sha) in entries.items()
    ], "truncated": False}


class PublicationSafeguards(unittest.TestCase):
    def test_different_pages_configuration_stops_before_any_write(self):
        for source, build_type in [
            ({"branch": "", "path": "/"}, "legacy"),
            ({"branch": "main", "path": "/docs"}, "legacy"),
            ({"branch": "main", "path": "/"}, "workflow"),
        ]:
            with self.subTest(source=source, build_type=build_type):
                calls = []

                def api(path, payload=None, method="GET"):
                    calls.append((path, method))
                    return {"source": source, "build_type": build_type,
                            "html_url": "https://example.github.io/Portafolio/"}

                with self.assertRaises(PublishError):
                    publish("owner/repo", "a" * 40, "missing-artifact", api=api)
                self.assertEqual(calls, [("repos/owner/repo/pages", "GET")])

    def test_original_site_change_is_rejected(self):
        old = git_tree(**{
            "index.html": ("100644", "blob", "original-index"),
            "CSS": ("040000", "tree", "original-css"),
        })
        valid = copy.deepcopy(old)
        valid["tree"].append({"path": "preview-v2", "mode": "040000",
                              "type": "tree", "sha": "built-site"})
        assert_original_site_unchanged(old, valid, "built-site")
        for field, value in (("sha", "changed-index"), ("mode", "100755")):
            changed = copy.deepcopy(valid)
            changed["tree"][0][field] = value
            with self.assertRaises(PublishError):
                assert_original_site_unchanged(old, changed, "built-site")
        removed = copy.deepcopy(valid)
        removed["tree"].pop(1)
        with self.assertRaises(PublishError):
            assert_original_site_unchanged(old, removed, "built-site")

    def test_replacing_only_old_v2_assets_is_allowed(self):
        old = git_tree(**{
            "index.html": ("100644", "blob", "original-index"),
            "preview-v2": ("040000", "tree", "old-assets"),
        })
        new = copy.deepcopy(old)
        new["tree"][1]["sha"] = "new-assets"
        assert_original_site_unchanged(old, new, "new-assets")

    def test_artifact_symlink_cannot_copy_an_outside_file(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "site").mkdir()
            (root / "outside.txt").write_text("outside")
            (root / "site" / "index.html").write_text("<html></html>")
            (root / "site" / "escape.txt").symlink_to(root / "outside.txt")
            with self.assertRaises(PublishError):
                artifact_files(root / "site")

    def test_new_source_blocks_stale_build_but_preview_commit_is_allowed(self):
        original = git_tree(**{
            "v2": ("040000", "tree", "source-v2"),
            "IMAGE": ("040000", "tree", "source-images"),
            "preview": ("040000", "tree", "old-preview"),
        })
        for source_changed in (False, True):
            with self.subTest(source_changed=source_changed):
                latest = copy.deepcopy(original)
                latest["tree"][2]["sha"] = "new-preview"
                if source_changed:
                    latest["tree"][0]["sha"] = "new-source-v2"

                def api(path):
                    if path.endswith("/git/commits/" + "a" * 40):
                        return {"tree": {"sha": "source-tree"}}
                    if path.endswith("/git/ref/heads/portfolio-v2"):
                        return {"object": {"sha": "b" * 40}}
                    if path.endswith("/git/commits/" + "b" * 40):
                        return {"tree": {"sha": "latest-tree"}}
                    if path.endswith("/git/trees/source-tree"):
                        return original
                    if path.endswith("/git/trees/latest-tree"):
                        return latest
                    self.fail(path)

                if source_changed:
                    with self.assertRaises(PublishError):
                        assert_current_source(api, "owner/repo", "a" * 40)
                else:
                    assert_current_source(api, "owner/repo", "a" * 40)

    def test_stable_url_uses_existing_pages_prefix(self):
        self.assertEqual(validate_pages({
            "source": {"branch": "tester", "path": "/"},
            "build_type": "legacy",
            "html_url": "https://example.github.io/Portafolio/",
        }), ("https://example.github.io/Portafolio/preview-v2/", "tester"))


if __name__ == "__main__":
    unittest.main()
