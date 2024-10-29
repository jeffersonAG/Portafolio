document.addEventListener("DOMContentLoaded", () => {
    const loadingBar = document.getElementById("loadingBar");
    const titleContainer = document.querySelector('.title-container');
    const titleText = document.querySelector('.title h1');

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
            const text = "jefferson";
            let index = 0;

            function typeText() {
                if (index < text.length) {
                    titleText.innerHTML += text.charAt(index);
                    index++;
                    setTimeout(typeText, 100); // Controlar la velocidad de escritura
                } else {
                    // Agregar un cursor parpadeante al final
                    const cursor = document.createElement("span");
                    cursor.textContent = "|";
                    cursor.style.color = "#00FF00"; // Color del cursor
                    cursor.style.animation = "blink 1s step-end infinite"; // Animación de parpadeo
                    titleText.appendChild(cursor);
                }
            }

            // Iniciar el efecto de escritura
            typeText();
        }
    }, 100); // Cambiar el intervalo de carga
});
