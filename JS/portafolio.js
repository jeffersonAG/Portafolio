// Configuración del SVG
const width = 800;
const height = 500;

// Crear el SVG en el contenedor #mapa
const svg = d3.select("#mapa")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Proyección ortográfica para efecto de globo
const projection = d3.geoOrthographic()
    .scale(250)
    .translate([width / 2, height / 2])
    .rotate([0, -10]);

// Generador de rutas para los países
const path = d3.geoPath().projection(projection);

// Cargar y dibujar el mapa mundial
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(data) {
    svg.selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "country");

    // Puntos de conexión en ciertas ciudades
    const cities = [
        { name: "New York", coords: [-74.006, 40.7128] },
        { name: "London", coords: [-0.1276, 51.5074] },
        { name: "Tokyo", coords: [139.6917, 35.6895] },
        { name: "Moscow", coords: [37.6173, 55.7558] },
    ];

    // Agregar puntos de conexión
    const connectionPoints = svg.selectAll("circle")
        .data(cities)
        .enter()
        .append("circle")
        .attr("class", "connection-point")
        .attr("r", 5)
        .attr("cx", d => projection(d.coords)[0])
        .attr("cy", d => projection(d.coords)[1]);

    function createAttackConnections() {
        cities.forEach((origin, i) => {
            const target = cities[(i + 1) % cities.length]; // Conectar en forma circular

            // Calcular las posiciones de las ciudades
            const originCoords = projection(origin.coords);
            const targetCoords = projection(target.coords);

            // Definir una curva con d3.line() y d3.curveNatural()
            const lineGenerator = d3.line()
                .curve(d3.curveBasis); // Establecer la interpolación de la línea como curva

            // Crear los puntos de control para la curva
            const midX = (originCoords[0] + targetCoords[0]) / 2;
            const midY = (originCoords[1] + targetCoords[1]) / 2 - 50; // Ajusta para que la curva se eleve

            // Crear el camino
            const pathData = lineGenerator([
                [originCoords[0], originCoords[1]],
                [midX, midY],
                [targetCoords[0], targetCoords[1]]
            ]);

            // Agregar la línea de conexión curva
            svg.append("path")
                .attr("class", "connection-line")
                .attr("d", pathData)
                .attr("stroke", "url(#arc-gradient)")
                .attr("stroke-width", 2)
                .attr("fill", "none")
                .attr("opacity", 0.7)
                .transition()
                .duration(2000)
                .ease(d3.easeLinear)
                .attr("opacity", 0)
                .remove();
        });
    }

    // Rotación continua del globo y actualización de puntos
    function rotateGlobe() {
        d3.timer(function(elapsed) {
            const rotationSpeed = 0.02; // Velocidad de rotación
            const rotation = [rotationSpeed * elapsed, -10];
            projection.rotate(rotation);
            svg.selectAll("path").attr("d", path); // Redibujar mapa

            // Actualizar posiciones de los puntos de conexión
            connectionPoints
                .attr("cx", d => projection(d.coords)[0])
                .attr("cy", d => projection(d.coords)[1]);
        });
    }

    // Iniciar rotación y ataques simulados
    rotateGlobe();
    setInterval(createAttackConnections, 2000); // Crear ataques cada 2 segundos
}).catch(function(error) {
    console.error('Error loading or parsing data:', error);
});
