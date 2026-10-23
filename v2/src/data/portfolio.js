const assetBase = 'https://raw.githubusercontent.com/jeffersonAG/Portafolio/main/IMAGE';
const cvUrl = 'https://raw.githubusercontent.com/jeffersonAG/Portafolio/main/CV/CV%20Espa%C3%B1ol.pdf';

export const profile = {
  name: 'Jefferson Arias Gutiérrez',
  shortName: 'JEFFERSON // PORTFOLIO',
  headline: ['Tecnología', 'Software', 'Infraestructura', 'Redes', 'Ciberseguridad', 'Sistemas'],
  intro: 'Profesional y estudiante del área tecnológica, enfocado en crear soluciones que conectan software, infraestructura y seguridad.',
  status: 'Disponible para nuevos proyectos',
  github: 'https://github.com/jeffersonAG',
  linkedin: 'https://www.linkedin.com/in/jefferson-arias-gutierrez-a8995b221/',
  cv: cvUrl,
  avatar: assetBase + '/Avatar%202d.jpg',
};

export const stats = [
  ['Proyectos', '3+'],
  ['Tecnologías', '15+'],
  ['Certificaciones', '6+'],
  ['Áreas', '5'],
];

export const technologies = [
  { name: 'Python', icon: assetBase + '/python.png', group: 'Desarrollo' },
  { name: 'Java', icon: assetBase + '/java.png', group: 'Desarrollo' },
  { name: 'Kotlin', icon: assetBase + '/kotlin.png', group: 'Desarrollo' },
  { name: 'JavaScript', icon: assetBase + '/javascript.png', group: 'Desarrollo' },
  { name: 'HTML5', icon: assetBase + '/html.png', group: 'Desarrollo' },
  { name: 'CSS3', icon: assetBase + '/css.png', group: 'Desarrollo' },
  { name: 'MySQL', icon: assetBase + '/MySQL.png', group: 'Datos' },
  { name: 'Linux', icon: assetBase + '/kali_linux.png', group: 'Sistemas' },
  { name: 'Windows', icon: assetBase + '/Windows.png', group: 'Sistemas' },
  { name: 'Cisco', icon: null, fallback: 'CI', group: 'Redes' },
  { name: 'React', icon: assetBase + '/react.png', group: 'Desarrollo' },
  { name: 'Django', icon: assetBase + '/Django.png', group: 'Desarrollo' },
];

export const skills = [
  'Desarrollo de software',
  'Soporte e infraestructura TI',
  'Redes y conectividad',
  'Ciberseguridad',
  'Bases de datos',
  'Resolución de incidentes',
];

export const experience = [
  {
    period: '2025 — ACTUALIDAD',
    title: 'Soporte técnico T.I.',
    description: 'Compañía PalmaTica S.A. Atención de incidencias, conectividad, sistemas, equipos, redes y continuidad operativa.',
  },
  {
    period: '2025',
    title: 'Infraestructura de red para la implementación del ERP Oracle',
    description: 'Compañía PalmaTica S.A. Levantamiento y mapeo de la infraestructura de red de una división integrada por dos zonas francas y la empresa nacional. Elaboración de diagramas de red y requerimientos técnicos para la migración a switches y puntos de acceso Fortinet. Solicitud de cotizaciones a proveedores para la licitación, coordinación de trabajos y realización de pruebas técnicas con el proveedor seleccionado en las zonas involucradas.',
  },
  {
    period: 'PROYECTOS',
    title: 'Desarrollo de software',
    description: 'Aplicaciones, automatización, interfaces web, bases de datos y proyectos personales.',
  },
  {
    period: 'FORMACIÓN',
    title: 'Redes y ciberseguridad',
    description: 'Práctica y formación continua en redes, sistemas, seguridad y análisis técnico.',
  },
];

export const education = [
  {
    period: '2021 — 2024',
    title: 'Estudiante de Ingeniería en Computadores',
    description: 'Tecnológico de Costa Rica (TEC).',
  },
  {
    period: '2025 — ACTUALIDAD',
    title: 'Estudiante de Informática',
    description: 'Universidad Estatal a Distancia (UNED).',
  },
  {
    period: 'FORMACIÓN TÉCNICA',
    title: 'Redes, software y ciberseguridad',
    description: 'Aprendizaje complementario mediante cursos, proyectos y laboratorios prácticos.',
  },
];

export const certifications = [
  'Junior Cybersecurity Analyst — Cisco',
  'Introduction to Cybersecurity — Cisco',
  'Introduction to Data Science — Cisco',
  'Python Essentials 1 — Cisco',
  'Python Essentials 2 — Cisco',
  'JavaScript Essentials 1 — Cisco',
  'Computer Hardware Basics — Cisco',
  'Ciberseguridad en el Teletrabajo — Google',
];

export const projects = [
  {
    slug: 'carpooling',
    name: 'CARPOOLING',
    status: 'COMPLETADO',
    description: 'Aplicación orientada a compartir viajes y optimizar rutas mediante una experiencia móvil conectada a base de datos.',
    stack: ['Kotlin', 'Java', 'MySQL'],
    image: assetBase + '/carpoling_1.png',
    github: profile.github,
  },
  {
    slug: 'portfolio-v2',
    name: 'PORTFOLIO V2',
    status: 'EN DESARROLLO',
    description: 'Reconstrucción del portafolio con arquitectura moderna, responsive y una identidad visual inspirada en terminales y ciberseguridad.',
    stack: ['React', 'Vite', 'D3', 'CSS'],
    image: null,
    github: profile.github,
  },
];
