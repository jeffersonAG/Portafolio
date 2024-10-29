// Configuración del SVG
const width = 1200;
const height = 750;

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

        const cities = [
            { name: "New York", coords: [-74.006, 40.7128] },
            { name: "London", coords: [-0.1276, 51.5074] },
            { name: "Tokyo", coords: [139.6917, 35.6895] },
            { name: "Moscow", coords: [37.6173, 55.7558] },
            { name: "Beijing", coords: [116.4074, 39.9042] },
            { name: "São Paulo", coords: [-46.6333, -23.5505] },
            { name: "Cape Town", coords: [18.4241, -33.9249] },
            { name: "Sydney", coords: [151.2093, -33.8688] },
            { name: "Paris", coords: [2.3522, 48.8566] },
            { name: "Dubai", coords: [55.2708, 25.2048] },
            { name: "Toronto", coords: [-79.3832, 43.6532] },
            { name: "Los Angeles", coords: [-118.2437, 34.0522] },
            { name: "Mexico City", coords: [-99.1332, 19.4326] },
            { name: "Rio de Janeiro", coords: [-43.1729, -22.9068] },
            { name: "Bangkok", coords: [100.5167, 13.7563] },
            { name: "Seoul", coords: [126.978, 37.5665] },
            { name: "Buenos Aires", coords: [-58.3838, -34.6037] },
            { name: "Istanbul", coords: [28.9784, 41.0082] },
            { name: "Cairo", coords: [31.2357, 30.0444] },
            { name: "Berlin", coords: [13.4050, 52.5200] },
            { name: "Madrid", coords: [-3.7038, 40.4168] },
            { name: "Amsterdam", coords: [4.9041, 52.3676] },
            { name: "Santiago", coords: [-70.6483, -33.4569] },
            { name: "Mumbai", coords: [72.8777, 19.0760] },
            { name: "Lagos", coords: [3.3792, 6.5244] },
            { name: "Kuala Lumpur", coords: [101.6869, 3.139] },
            { name: "Hanoi", coords: [105.8542, 21.0285] },
            { name: "Nairobi", coords: [36.8219, -1.2864] },
            { name: "Amsterdam", coords: [4.9041, 52.3676] },
            { name: "Athens", coords: [23.7275, 37.9838] },
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

        function drawConnections() {
            // Eliminar líneas existentes
            svg.selectAll(".connection-line").remove();
        
            // Redibujar las líneas de conexión entre puntos
            cities.forEach((origin, i) => {
                const target = cities[(i + 1) % cities.length];
        
                // Calcular las posiciones actualizadas de las ciudades
                const originCoords = projection(origin.coords);
                const targetCoords = projection(target.coords);
        
                // Ajustar la curva para que simule un arco en el espacio
                const midX = (originCoords[0] + targetCoords[0]) / 2;
                const midY = (originCoords[1] + targetCoords[1]) / 2;
        
                // Aumentar la altura de la curva
                const controlPointY = midY - Math.abs(targetCoords[0] - originCoords[0]) * 0.6;
        
                // Crear el camino con un arco
                const pathData = `M${originCoords[0]},${originCoords[1]} C${midX},${controlPointY} ${midX},${controlPointY} ${targetCoords[0]},${targetCoords[1]}`;
        
                // Crear un color aleatorio para cada línea
                const color = d3.interpolateRainbow(Math.random());
        
                // Agregar la línea de conexión curva
                svg.append("path")
                    .attr("class", "connection-line")
                    .attr("d", pathData)
                    .attr("stroke", color) // Usar un color aleatorio
                    .attr("stroke-width", 3) // Aumentar el grosor de la línea
                    .attr("fill", "none")
                    .attr("opacity", 0.8)
                    .attr("filter", "url(#shadow)"); // Aplicar sombra
            });
        }
        
        // Definir un gradiente de sombra en el SVG
        svg.append("defs").append("linearGradient")
    .attr("id", "arc-gradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0).attr("y1", 0)
    .attr("x2", 1).attr("y2", 1)
    .append("stop").attr("offset", "0%").attr("stop-color", "#00FF00") // Color inicial
    .append("stop").attr("offset", "100%").attr("stop-color", "#FF0000"); // Color final
        
        

    // Rotación continua del globo y actualización de puntos y líneas
    function rotateGlobe() {
        d3.timer(function(elapsed) {
            const rotationSpeed = 0.02; // Velocidad de rotación
            const rotation = [rotationSpeed * elapsed, -10];
            projection.rotate(rotation);
            
            // Redibujar mapa y puntos
            svg.selectAll("path").attr("d", path);
            connectionPoints
                .attr("cx", d => projection(d.coords)[0])
                .attr("cy", d => projection(d.coords)[1]);

            // Redibujar las líneas de conexión
            drawConnections();
        });
    }

    // Iniciar rotación del globo
    rotateGlobe();

}).catch(function(error) {
    console.error('Error loading or parsing data:', error);
});
