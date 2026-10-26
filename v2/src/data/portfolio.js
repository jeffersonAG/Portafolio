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
  ['Proyectos', '5+'],
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
    description: 'Palma Tica S.A. — División Coto. Atención de incidencias, conectividad, sistemas, equipos, redes y continuidad operativa. Participación en 2025 en el proyecto de infraestructura de red para la implementación del ERP Oracle.',
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
    slug: 'infraestructura-erp-oracle',
    name: 'INFRAESTRUCTURA DE RED PARA ERP ORACLE',
    status: 'EMPRESARIAL',
    description: 'Grupo Agroindustrial Numar · 2025. Infraestructura de red para apoyar la implementación del ERP Oracle en dos zonas francas y una empresa nacional.',
    stack: ['Fortinet', 'Switches', 'Wi-Fi'],
    image: 'https://raw.githubusercontent.com/jeffersonAG/Portafolio/portfolio-v2/IMAGE/ORACLE.png',
    placeholderSymbol: 'NET',
    placeholderLabel: 'NUMAR // 2025',
    github: null,
    details: [
      {
        title: 'Alcance',
        text: 'Preparación de la infraestructura de red para apoyar la implementación del ERP Oracle durante 2025 en tres empresas del Grupo Agroindustrial Numar: dos zonas francas y una empresa nacional.',
      },
      {
        title: 'Empresas y sedes',
        items: [
          'Zona franca: Compañía Industrial Aceitera Coto Cincuenta y Cuatro S.A. (sede Coto 54).',
          'Zona franca: Compact Seeds & Clones S.A.',
          'Empresa nacional: Palma Tica S.A. (División Coto).',
        ],
      },
      {
        title: 'Mi participación',
        items: [
          'Levantamiento y mapeo de la infraestructura de red.',
          'Elaboración de diagramas de red y requerimientos técnicos para la migración a switches y puntos de acceso Fortinet.',
          'Solicitud de cotizaciones a proveedores para el proceso de licitación.',
          'Coordinación de trabajos con el proveedor seleccionado.',
          'Realización de pruebas técnicas con el proveedor en las zonas involucradas.',
        ],
      },
      {
        title: 'Tecnologías',
        text: 'Switches y puntos de acceso Fortinet, redes y conectividad Wi-Fi.',
      },
    ],
  },
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
    slug: 'nyx',
    name: 'NYX',
    status: 'EN EJECUCIÓN',
    description: 'Asistente de inteligencia artificial local con memoria, herramientas y un laboratorio experimental para entrenar una red neuronal propia con Python y PyTorch.',
    stack: ['Python', 'PyTorch', 'FastAPI', 'React'],
    image: null,
    placeholderSymbol: 'NYX',
    placeholderLabel: 'INTELIGENCIA ARTIFICIAL',
    github: 'https://github.com/jeffersonAG/Nyx/tree/feature/nyx-0.2-crimson',
    details: [
      {
        title: 'Objetivo',
        text: 'Desarrollar un asistente local que reúna conversación, organización personal y recuperación de conocimientos, con control sobre los datos y los procesos de aprendizaje.',
      },
      {
        title: 'Desarrollo actual',
        items: [
          'Interfaz web en React y API en Python con FastAPI.',
          'Conversación local con Qwen mediante Ollama, notas, tareas y calendario.',
          'Memoria semántica, registro de experiencias y relaciones entre conocimientos con evidencia.',
          'Laboratorio de red neuronal propia en PyTorch: Transformer, entrenamiento, validación y guardado de pesos.',
        ],
      },
      {
        title: 'Estado actual',
        text: 'Proyecto en ejecución. La red neuronal propia está en fase alfa experimental y su entrenamiento requiere datos seleccionados y supervisión; el chat habitual continúa utilizando Qwen mediante Ollama.',
      },
    ],
  },
  {
    slug: 'saf',
    name: 'S.A.F',
    status: 'EN EJECUCIÓN',
    description: 'Sistema de Administración Financiera para organizar cuentas, presupuestos, ingresos, gastos y metas desde una aplicación web adaptable a móvil y escritorio.',
    stack: ['React', 'Django', 'PostgreSQL', 'Docker'],
    image: null,
    placeholderSymbol: 'S.A.F',
    placeholderLabel: 'ADMINISTRACIÓN FINANCIERA',
    github: null,
    details: [
      {
        title: 'Objetivo',
        text: 'Centralizar la administración financiera y facilitar el seguimiento de movimientos, presupuestos y objetivos de ahorro desde un mismo panel.',
      },
      {
        title: 'Funciones actuales',
        items: [
          'Administración de cuentas, categorías y presupuestos mensuales.',
          'Registro de ingresos, gastos y transferencias entre cuentas.',
          'Metas de ahorro, seguimiento de aportes y comprobantes asociados a movimientos.',
          'Comparación gráfica entre presupuesto y gasto, con acceso y datos separados por usuario.',
        ],
      },
      {
        title: 'Tecnologías',
        text: 'React y TypeScript en la interfaz; Python, Django y Django REST Framework en la API; PostgreSQL para los datos y Docker Compose para el despliegue.',
      },
      {
        title: 'Estado actual',
        text: 'Proyecto en ejecución, con una primera versión funcional y nuevas mejoras planificadas. Repositorio privado.',
      },
    ],
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
