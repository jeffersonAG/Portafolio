document.addEventListener("DOMContentLoaded", () => {
    const loadingBar = document.getElementById("loadingBar");
    const titleContainer = document.querySelector('.title-container');
    const titleText = document.querySelector('.title h1');
    const subtitleText = document.querySelector('.subtitle'); // Subtítulo

    // Simular una carga
    let loadingPercentage = 0;

    const loadingInterval = setInterval(() => {
        loadingPercentage += 5; // Incrementar el porcentaje
        loadingBar.style.width = loadingPercentage + "%"; // Ajustar el ancho de la barra

        // Cuando la carga esté completa
        if (loadingPercentage >= 100) {
            clearInterval(loadingInterval); // Detener el intervalo
            loadingBar.parentElement.style.display = "none"; // Ocultar la barra de carga
            titleContainer.style.display = "block"; // Mostrar el contenedor del título
            
            // Simular la escritura del título
            const text = "Jefferson Arias Gutiérrez";
            let index = 0;

            function typeText() {
                if (index < text.length) {
                    titleText.innerHTML += text.charAt(index);
                    index++;
                    setTimeout(typeText, 100); // Controlar la velocidad de escritura
                } else {
                    typeSubtitle(); // Llamar a la función de subtítulo después de que termine el título
                }
            }

            // Función para escribir el subtítulo
            const subtitle = "Desarrollador de Software y Analista de Ciber Seguridad";
            let subtitleIndex = 0;

            function typeSubtitle() {
                if (subtitleIndex < subtitle.length) {
                    subtitleText.innerHTML += subtitle.charAt(subtitleIndex);
                    subtitleIndex++;
                    setTimeout(typeSubtitle, 100); // Controlar la velocidad de escritura
                }
            }

            // Iniciar el efecto de escritura del título
            typeText();
        }
    }, 100); // Cambiar el intervalo de carga
});
