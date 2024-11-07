// Función para la primera terminal
const output1 = document.getElementById('output');
const texts1 = [
    'Estudiante de Ingeniería en Computadores. \n' +
    'Trabajador versátil con experiencia en:\n' +
    '- Desarrollo de aplicaciones móviles\n' +
    '- Creación de sitios web\n' +
    '- Análisis de amenazas cibernéticas\n' +
    '- Reparación de hardware\n' +
    'Enfocado en soluciones tecnológicas eficaces,\n' +
    'aplicando mi conocimiento interdisciplinario.\n' +
    'Apasionado por la innovación y siempre buscando\n' +
    'oportunidades para aplicar mis habilidades\n' +
    'en proyectos desafiantes.'
  ];
  


let index1 = 0;

function typeText1() {
    let charIndex = 0;
    const typingInterval = setInterval(() => {
        output1.innerHTML += texts1[index1].charAt(charIndex);
        charIndex++;

        if (charIndex === texts1[index1].length) {
            clearInterval(typingInterval);
            output1.innerHTML += '<br>'; // Agregar una nueva línea al finalizar el texto
            index1++;

            // Si hay más textos, continuar escribiendo
            if (index1 < texts1.length) {
                setTimeout(typeText1, 5); // Esperar 1 segundo antes de comenzar a escribir el siguiente texto
            }
        }
    }, 10); // Intervalo de tiempo para escribir cada carácter
}

// Iniciar la animación de texto para la primera terminal
typeText1();

// Función para la segunda terminal
const output2 = document.getElementById('output2');
const texts2 = [
    'Trabajo en Equipo',
    'Trabajo Bajo Presión',
    'Ética Hacke',
    'Colaboración Interdisciplinaria',
    'Empatía Tecnológica',
    'Resiliencia Digital',
    'Proceso completo.',
    'Pensamiento Holístico'
];

let index2 = 0;

function typeText2() {
    let charIndex = 0;
    const typingInterval = setInterval(() => {
        output2.innerHTML += texts2[index2].charAt(charIndex);
        charIndex++;

        if (charIndex === texts2[index2].length) {
            clearInterval(typingInterval);
            output2.innerHTML += '<br>'; // Agregar una nueva línea al finalizar el texto
            index2++;

            // Si hay más textos, continuar escribiendo
            if (index2 < texts2.length) {
                setTimeout(typeText2, 5); // Esperar 1 segundo antes de comenzar a escribir el siguiente texto
            }
        }
    }, 10); // Intervalo de tiempo para escribir cada carácter
}

// Iniciar la animación de texto para la segunda terminal
typeText2(); // No olvides iniciar la segunda terminal

// Función para la terminal 3
const output3 = document.getElementById('output3');
const texts3 = [
    '. Estudiante de Ingenieria en Computadores en el Instituto Tecnologico de Costa Rica',
    '. Introduction to Cybersecurity / Cisco',
    '. Introduction to Data Science / Cisco', 
    '. Junior Cybersecurity Analyst / Cisco' ,
    '. Python Essentials 1 / Cisco',
    '. Python Essentials 2 / Cisco' ,
    '. JavaScript Essentials 1 / Cisco',
    '. Introducción a Git y GitHub / TodoCode Academy',
    '. HTML y CSS desde Cero / TodoCode Academy', 
    '. Protege tu negocio: Ciberseguridad en el Teletrabajo / Google',
    '. Computer Hardware Basics / Cisco', 
    'Listo para operar.',
    
];


let index3 = 0;

function typeText3() {
    let charIndex = 0;
    const typingInterval = setInterval(() => {
        output3.innerHTML += texts3[index3].charAt(charIndex);
        charIndex++;

        if (charIndex === texts3[index3].length) {
            clearInterval(typingInterval);
            output3.innerHTML += '<br>'; // Agregar una nueva línea al finalizar el texto
            index3++;

            // Si hay más textos, continuar escribiendo
            if (index3 < texts3.length) {
                setTimeout(typeText3, 5); // Esperar 1 segundo antes de comenzar a escribir el siguiente texto
            }
        }
    }, 10); // Intervalo de tiempo para escribir cada carácter
}

// Iniciar la animación de texto para la tercera terminal
typeText3();

