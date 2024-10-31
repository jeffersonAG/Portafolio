// Función para la primera terminal
const output1 = document.getElementById('output');
const texts1 = [
  'Iniciando proceso...',
  'Cualidades: Creativo e innovador...',
  'Trabajo en equipo: Siempre dispuesto a ayudar...',
  'Pasión: Desarrollo de software y ciberseguridad...',
  'Comprometido con el aprendizaje continuo...',
  'Conectando ideas y soluciones...',
  'Cargando habilidades...',
  'Proceso completo. Listo para colaborar...'
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
                setTimeout(typeText1, 1000); // Esperar 1 segundo antes de comenzar a escribir el siguiente texto
            }
        }
    }, 100); // Intervalo de tiempo para escribir cada carácter
}

// Iniciar la animación de texto para la primera terminal
typeText1();

// Función para la segunda terminal
const output2 = document.getElementById('output2');
const texts2 = [
    'Conectando al servidor...',
    'Verificando credenciales...',
    'Accediendo a datos...',
    'Cargando información...',
    'Datos encontrados: 42 registros.',
    'Descargando datos...',
    'Proceso completo.',
    'Desconectando...'
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
                setTimeout(typeText2, 1000); // Esperar 1 segundo antes de comenzar a escribir el siguiente texto
            }
        }
    }, 100); // Intervalo de tiempo para escribir cada carácter
}

// Iniciar la animación de texto para la segunda terminal
typeText2();
