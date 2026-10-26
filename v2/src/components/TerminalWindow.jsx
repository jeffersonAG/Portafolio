export default function TerminalWindow({ title, command, children, className = '' }) {
  return (
    <section className={`terminal-window ${className}`}>
      <div className="terminal-bar">
        <div className="terminal-lights" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="terminal-command">&gt;_ {command || title}</div>
        <div className="terminal-status">ONLINE</div>
      </div>
      <div className="terminal-body">{children}</div>
    </section>
  );
}
