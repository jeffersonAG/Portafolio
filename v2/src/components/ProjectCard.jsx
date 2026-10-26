export default function ProjectCard({ project, onOpen }) {
  return (
    <article className="project-card">
      <div className="project-media">
        {project.image ? (
          <img src={project.image} alt={`Vista del proyecto ${project.name}`} />
        ) : (
          <div className="project-placeholder" aria-hidden="true">
            <span>{project.placeholderSymbol || '</>'}</span>
            <small>{project.placeholderLabel || 'BUILDING'}</small>
          </div>
        )}
      </div>
      <div className="project-content">
        <div className="project-heading">
          <h3>{project.name}</h3>
          <span className={`project-status ${project.status === 'COMPLETADO' ? 'done' : ''}`}>{project.status}</span>
        </div>
        <p>{project.description}</p>
        <div className="tag-row">
          {project.stack.map((item) => <span className="tag" key={item}>{item}</span>)}
        </div>
        <button className="terminal-button compact" onClick={() => onOpen(project)}>VER DETALLES</button>
      </div>
    </article>
  );
}
