// Función para abrir una ventana emergente personalizada
function abrirproximamente() {
    const url = 'proximamente.html'; // Página que se abrirá en la ventana emergente
    const ancho = 800; // Ancho de la ventana
    const alto = 600; // Alto de la ventana
    const x = (screen.width / 2) - (ancho / 2); // Centrar en pantalla horizontalmente
    const y = (screen.height / 2) - (alto / 2); // Centrar en pantalla verticalmente

    // Abrir la ventana emergente
    window.open(
        url,
        'proximamente',
        `width=${ancho},height=${alto},left=${x},top=${y},resizable=no,scrollbars=yes`
    );
}
