import { useMemo, useState } from 'react';
import TerminalWindow from './components/TerminalWindow.jsx';
import CyberGlobe from './components/CyberGlobe.jsx';
import ProjectCard from './components/ProjectCard.jsx';
import {
  certifications,
  education,
  experience,
  profile,
  projects,
  skills,
  technologies,
} from './data/portfolio.js';

const nav = [
  ['Inicio', 'inicio'],
  ['Sobre mí', 'sobre-mi'],
  ['Experiencia', 'experiencia'],
  ['Tecnologías', 'tecnologias'],
  ['Proyectos', 'proyectos'],
  ['Educación', 'educacion'],
  ['Contacto', 'contacto'],
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const groups = useMemo(() => ['Todos', ...new Set(technologies.map(t => t.group))], []);
  const [filter, setFilter] = useState('Todos');
  const [contactStatus, setContactStatus] = useState('idle');
  const visibleTech = filter === 'Todos' ? technologies : technologies.filter(t => t.group === filter);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <div className="app-shell">
      <div className="scanlines" aria-hidden="true" />
      <header className="topbar">
        <button className="brand" onClick={() => go('inicio')} aria-label="Ir al inicio">
          <span className="brand-mark">&gt;_</span>
          <span>{profile.shortName}</span>
        </button>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Navegación principal">
          {nav.map(([label, id]) => (
            <button key={id} onClick={() => go(id)}>[ {label.toUpperCase()} ]</button>
          ))}
        </nav>

        <button className="menu-button" onClick={() => setMenuOpen(v => !v)} aria-label="Abrir menú">
          {menuOpen ? '×' : '☰'}
        </button>
      </header>

      <main>
        <section className="hero section-frame" id="inicio">
          <div className="hero-copy">
            <TerminalWindow command="whoami">
              <p className="eyebrow">SYSTEM://PROFILE</p>
              <h1><span>JEFFERSON</span><strong>ARIAS GUTIÉRREZ</strong></h1>
              <div className="headline-row">
                {profile.headline.map(item => <span key={item}>{item}</span>)}
              </div>
              <p className="lead">{profile.intro}<span className="cursor">█</span></p>
              <div className="hero-actions">
                <button className="terminal-button" onClick={() => go('proyectos')}>&gt; VER MIS PROYECTOS</button>
                <a className="terminal-button secondary" href={profile.cv} target="_blank" rel="noreferrer">&gt; DESCARGAR CV</a>
              </div>
              <div className="availability"><span className="online-dot" />[ {profile.status.toUpperCase()} ]</div>
            </TerminalWindow>
          </div>

          <div className="hero-visual">
            <CyberGlobe />
            <div className="globe-overlay overlay-top">
              <strong>&gt;&gt; LIVE THREAT FEED</strong>
              <span>&gt; PORT SCAN <b>DETECTED</b></span>
              <span>&gt; RECON PROBE <b>ACTIVE</b></span>
              <span>&gt; DNS BURST <b>TRACKING</b></span>
              <span>&gt; AUTH ATTEMPT <b>BLOCKED</b></span>
              <span>&gt; GLOBAL MESH <b>ONLINE</b></span>
            </div>
            <div className="globe-overlay overlay-bottom">
              <strong>&gt;&gt; NETWORK STATUS</strong>
              <span>&gt; Active Nodes: <b>13</b></span>
              <span>&gt; Live Routes: <b>18</b></span>
              <span>&gt; Region Focus: <b>LATAM</b></span>
              <span className="threat-pulse">&gt; Threat Level: <b className="threat-level">HIGH</b></span>
              <span>&gt; Estado: Online <i className="online-dot" /></span>
            </div>
          </div>

          <div className="tech-strip">
            <span className="strip-title"><i className="online-dot" /> TECNOLOGÍAS PRINCIPALES</span>
            <div className="tech-strip-items">
              {technologies.slice(0, 10).map(tech => (
                <div className="mini-tech" key={tech.name}>
                  {tech.icon ? <img src={tech.icon} alt="" /> : <span className="tech-fallback">{tech.fallback || tech.name.slice(0, 2).toUpperCase()}</span>}
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="content-grid" id="sobre-mi">
          <div className="section-label">SECCIÓN: SOBRE MÍ</div>
          <TerminalWindow command="cat sobre_mi.txt" className="about-terminal">
            <div className="about-layout">
              <div className="avatar-frame">
                <img src={profile.avatar} alt="Avatar de Jefferson Arias Gutiérrez" />
              </div>
              <div>
                <p>Hola, soy Jefferson.</p>
                <p>Me interesa construir soluciones que mezclen desarrollo, infraestructura, redes, ciberseguridad y sistemas.</p>
                <p>Mi enfoque es práctico: comprender el problema, diseñar una solución mantenible y aprender de cada implementación.</p>
                <div className="skill-cloud">{skills.map(skill => <span key={skill}>{skill}</span>)}</div>
              </div>
            </div>
          </TerminalWindow>
        </section>

        <section className="content-grid" id="experiencia">
          <div className="section-label">SECCIÓN: EXPERIENCIA</div>
          <TerminalWindow command="cat experiencia.log">
            <div className="timeline">
              {experience.map(item => (
                <article className="timeline-item" key={item.title}>
                  <div className="timeline-period">{item.period}</div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </TerminalWindow>
        </section>

        <section className="content-grid" id="tecnologias">
          <div className="section-label">SECCIÓN: TECNOLOGÍAS</div>
          <TerminalWindow command="ls -la tecnologias/">
            <div className="filter-row">
              {groups.map(group => (
                <button className={filter === group ? 'filter active' : 'filter'} key={group} onClick={() => setFilter(group)}>{group}</button>
              ))}
            </div>
            <div className="tech-grid">
              {visibleTech.map(tech => (
                <div className="tech-card" key={tech.name}>
                  {tech.icon ? <img src={tech.icon} alt="" /> : <span className="tech-fallback large">{tech.fallback || tech.name.slice(0, 2).toUpperCase()}</span>}
                  <strong>{tech.name}</strong>
                  <small>{tech.group}</small>
                </div>
              ))}
            </div>
          </TerminalWindow>
        </section>

        <section className="content-grid" id="proyectos">
          <div className="section-label">SECCIÓN: PROYECTOS</div>
          <TerminalWindow command="ls -la proyectos/">
            <div className="project-grid">
              {projects.map(project => <ProjectCard key={project.slug} project={project} onOpen={setSelectedProject} />)}
            </div>
          </TerminalWindow>
        </section>

        <section className="split-section" id="educacion">
          <div>
            <div className="section-label">SECCIÓN: EDUCACIÓN</div>
            <TerminalWindow command="cat educacion.txt">
              <div className="timeline compact-timeline">
                {education.map(item => (
                  <article className="timeline-item" key={item.title}>
                    <div className="timeline-period">{item.period}</div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </TerminalWindow>
          </div>

          <div>
            <div className="section-label">SECCIÓN: CERTIFICACIONES</div>
            <TerminalWindow command="cat certificaciones.txt">
              <ul className="cert-list">
                {certifications.map(cert => <li key={cert}><span>◈</span>{cert}</li>)}
              </ul>
            </TerminalWindow>
          </div>
        </section>

        <section className="content-grid" id="contacto">
          <div className="section-label">SECCIÓN: CONTACTO</div>
          <TerminalWindow command="./enviar_mensaje.sh">
            <div className="contact-grid">
              <form
                className="contact-form"
                onSubmit={async (event) => {
                  event.preventDefault();
                  if (contactStatus === 'sending') return;

                  const form = event.currentTarget;
                  const formData = new FormData(form);
                  if (formData.get('website')) return;

                  setContactStatus('sending');

                  try {
                    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        service_id: 'service_z9vbgm4',
                        template_id: 'template_1s6v73e',
                        user_id: '9IiEnFsf94JAoczav',
                        template_params: {
                          name: formData.get('name'),
                          email: formData.get('email'),
                          message: formData.get('message'),
                          subject: 'Solicitud de contacto desde Portfolio V2',
                        },
                      }),
                    });

                    if (!response.ok) throw new Error('EmailJS request failed');
                    form.reset();
                    setContactStatus('success');
                  } catch {
                    setContactStatus('error');
                  }
                }}
              >
                <label>Nombre<input name="name" placeholder="Tu nombre" required /></label>
                <label>Correo<input name="email" type="email" placeholder="correo@ejemplo.com" required /></label>
                <label>Mensaje<textarea name="message" placeholder="Cuéntame sobre tu proyecto..." required /></label>
                <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex="-1" autoComplete="off" /></label>
                <button className="terminal-button" type="submit" disabled={contactStatus === 'sending'}>
                  {contactStatus === 'sending' ? '> TRANSMITIENDO...' : '> ENVIAR MENSAJE'}
                </button>
                <div className={`form-status ${contactStatus}`} aria-live="polite">
                  {contactStatus === 'success' && '> MENSAJE ENTREGADO CORRECTAMENTE'}
                  {contactStatus === 'error' && '> ERROR DE TRANSMISIÓN. INTENTA NUEVAMENTE.'}
                </div>
              </form>
              <div className="contact-links">
                <p>&gt; OTRAS FORMAS DE CONTACTO</p>
                <a href={profile.github} target="_blank" rel="noreferrer">GitHub<span>github.com/jeffersonAG</span></a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn<span>Perfil profesional</span></a>
                <a href={profile.cv} target="_blank" rel="noreferrer">CV<span>Descargar versión PDF</span></a>
              </div>
            </div>
          </TerminalWindow>
        </section>
      </main>

      <footer className="footer">
        <span>&gt; system.status: ONLINE</span>
        <span>JEFFERSON // PORTFOLIO V2</span>
      </footer>

      {selectedProject && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelectedProject(null)}>
          <div className="project-modal" role="dialog" aria-modal="true" aria-label={selectedProject.name} onMouseDown={e => e.stopPropagation()}>
            <TerminalWindow command={`cat ${selectedProject.slug}.md`}>
              <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Cerrar detalle">×</button>
              <div className="project-detail">
                <div>
                  {selectedProject.image ? <img src={selectedProject.image} alt={selectedProject.name} /> : <div className="project-placeholder large">&lt;/&gt;</div>}
                </div>
                <div>
                  <div className="project-heading">
                    <h2>{selectedProject.name}</h2>
                    <span className="project-status done">{selectedProject.status}</span>
                  </div>
                  <p>{selectedProject.description}</p>
                  <div className="detail-list">
                    <span>&gt; Problema</span>
                    <span>&gt; Objetivo</span>
                    <span>&gt; Mi participación</span>
                    <span>&gt; Tecnologías</span>
                    <span>&gt; Arquitectura</span>
                    <span>&gt; Resultados</span>
                  </div>
                  <a className="terminal-button compact" href={selectedProject.github} target="_blank" rel="noreferrer">&gt; VER EN GITHUB</a>
                </div>
              </div>
            </TerminalWindow>
          </div>
        </div>
      )}
    </div>
  );
}
