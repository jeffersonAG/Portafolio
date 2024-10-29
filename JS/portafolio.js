// Configuración del SVG
const width = 800;
const height = 500;
const radius = Math.min(width, height) / 2; // Radio del globo

// Crear el SVG en el contenedor #mapa
const svg = d3.select("#mapa")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

// Proyección del globo terráqueo
const projection = d3.geoOrthographic()
    .scale(radius - 10) // Escala del globo
    .translate([0, 0])  // Centrado en el medio del SVG
    .clipAngle(90);     // Clip para simular una esfera

// Generador de rutas para los países
const path = d3.geoPath().projection(projection);

// Cargar y dibujar el mapa mundial
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(data) {
    svg.append("circle")  // Sombra exterior del globo
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", radius)
        .attr("fill", "rgba(0, 0, 0, 0.2)");

    svg.selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "country");

    // Agregar puntos de conexión en ciertas ciudades
    const cities = [
        { name: "New York", coords: [-74.006, 40.7128] },
        { name: "London", coords: [-0.1276, 51.5074] },
        { name: "Tokyo", coords: [139.6917, 35.6895] },
        { name: "Moscow", coords: [37.6173, 55.7558] },
    ];

    cities.forEach(city => {
        const [x, y] = projection(city.coords);
        svg.append("circle")
            .attr("class", "connection-point")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 5);
    });

    // Función para crear arcos de conexión
    function createArcPath(origin, destination) {
        const originCoords = projection(origin.coords);
        const destinationCoords = projection(destination.coords);
        const midPoint = [(originCoords[0] + destinationCoords[0]) / 2, (originCoords[1] + destinationCoords[1]) / 2 - 80]; // Ajuste del arco

        return `M ${originCoords[0]},${originCoords[1]}
                Q ${midPoint[0]},${midPoint[1]}
                ${destinationCoords[0]},${destinationCoords[1]}`;
    }

    // Simular ciberataques con arcos 3D
    function simulateAttacks() {
        svg.selectAll(".connection-arc").remove(); // Eliminar arcos anteriores

        cities.forEach((origin, i) => {
            cities.slice(i + 1).forEach(destination => {
                svg.append("path")
                    .attr("class", "connection-arc")
                    .attr("d", createArcPath(origin, destination))
                    .attr("stroke-dashoffset", Math.random() * 20); // Offset aleatorio
            });
        });
    }

    setInterval(simulateAttacks, 2000); // Ejecutar cada 2 segundos para actualizar ataques
}).catch(function(error) {
    console.error('Error loading or parsing data:', error);
});
