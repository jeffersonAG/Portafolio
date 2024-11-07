document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.connection').forEach(connection => {
        const x1 = parseFloat(connection.getAttribute('data-x1'));
        const y1 = parseFloat(connection.getAttribute('data-y1'));
        const z1 = parseFloat(connection.getAttribute('data-z1'));
        const x2 = parseFloat(connection.getAttribute('data-x2'));
        const y2 = parseFloat(connection.getAttribute('data-y2'));
        const z2 = parseFloat(connection.getAttribute('data-z2'));

        const network = document.querySelector('.network');
        const networkWidth = network.offsetWidth;
        const networkHeight = network.offsetHeight;

        const px1 = (x1 / 100) * networkWidth;
        const py1 = (y1 / 100) * networkHeight;
        const px2 = (x2 / 100) * networkWidth;
        const py2 = (y2 / 100) * networkHeight;

        const dx = px2 - px1;
        const dy = py2 - py1;
        const dz = z2 - z1;
        const length = Math.sqrt(dx * dx + dy * dy + dz * dz);

        const angleXY = Math.atan2(dy, dx) * (180 / Math.PI);
        const angleZ = Math.atan2(dz, Math.sqrt(dx * dx + dy * dy)) * (180 / Math.PI);

        connection.style.width = `${length}px`;
        connection.style.left = `${px1}px`;
        connection.style.top = `${py1}px`;
        connection.style.transform = `rotateX(${angleZ}deg) rotateY(${angleXY}deg) translateZ(1px)`; // Añadido translateZ
    });
});
