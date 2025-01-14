document.getElementById("hacker-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Detiene el envío estándar del formulario

    // Captura los datos del formulario
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Configura los parámetros de la plantilla
    const serviceID = "service_z9vbgm4"; // ID del servicio Gmail configurado
    const templateID = "template_1s6v73e"; // Reemplaza con tu Template ID
    const userID = "9IiEnFsf94JAoczav"; // Clave pública

    const templateParams = {
        name: name,               // Nombre del remitente
        email: email,             // Correo del remitente
        message: message,         // Mensaje del remitente
        subject: "Solicitud de contacto de portafolio para trabajo" // Asunto personalizado
    };
    
    

    // Envía el correo usando la API de EmailJS
    fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            service_id: serviceID,
            template_id: templateID,
            user_id: userID,
            template_params: templateParams
        })
    })
    .then(response => {
        if (response.ok) {
            alert("¡Mensaje enviado exitosamente!");
        } else {
            alert("Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.");
        }
    })
    .catch(error => {
        console.error("Error al enviar el mensaje:", error);
        alert("No se pudo enviar el mensaje. Por favor, revisa tu conexión a internet.");
    });
});
