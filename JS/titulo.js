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
            const text = "Jefferson";
            let index = 0;

            function typeText() {
                if (index < text.length) {
                    titleText.innerHTML += text.charAt(index);
                    index++;
                    setTimeout(typeText, 100); // Controlar la velocidad de escritura
                } else {
                    
                }
            }

            // Iniciar el efecto de escritura
            typeText();
        }
    }, 100); // Cambiar el intervalo de carga
});
