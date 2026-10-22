import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const hubs = [
  { name: 'Costa Rica', coordinates: [-84.09, 9.75] },
  { name: 'San Francisco', coordinates: [-122.42, 37.77] },
  { name: 'New York', coordinates: [-74.01, 40.71] },
  { name: 'London', coordinates: [-0.13, 51.51] },
  { name: 'Madrid', coordinates: [-3.7, 40.42] },
  { name: 'Tokyo', coordinates: [139.69, 35.68] },
  { name: 'São Paulo', coordinates: [-46.63, -23.55] },
];

export default function CyberGlobe() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let frame;
    let disposed = false;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = async () => {
      const response = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
      const world = await response.json();
      if (disposed) return;

      const svg = d3.select(host).append('svg').attr('aria-label', 'Globo tecnológico animado');
      const sphere = svg.append('path').attr('class', 'globe-sphere');
      const graticule = svg.append('path').datum(d3.geoGraticule10()).attr('class', 'globe-grid');
      const countries = svg.append('g').selectAll('path').data(world.features).join('path').attr('class', 'globe-country');
      const arcs = svg.append('g').selectAll('path').data(hubs.slice(1)).join('path').attr('class', 'globe-arc');
      const nodes = svg.append('g').selectAll('circle').data(hubs).join('circle').attr('class', 'globe-node').attr('r', d => d.name === 'Costa Rica' ? 5 : 3);
      const costaRicaLabel = svg.append('g').attr('class', 'cr-label');
      costaRicaLabel.append('rect').attr('rx', 5).attr('width', 122).attr('height', 40);
      costaRicaLabel.append('text').attr('x', 10).attr('y', 16).text('> COSTA RICA');
      costaRicaLabel.append('text').attr('x', 10).attr('y', 31).attr('class', 'muted').text('> MI UBICACIÓN');

      const projection = d3.geoOrthographic().clipAngle(90);
      const path = d3.geoPath(projection);

      const buildArc = (target) => {
        const interpolator = d3.geoInterpolate(hubs[0].coordinates, target.coordinates);
        return {
          type: 'LineString',
          coordinates: d3.range(0, 1.001, 0.025).map(interpolator),
        };
      };

      const arcGeometry = hubs.slice(1).map(buildArc);

      function draw(rotation = [-18, -10]) {
        const box = host.getBoundingClientRect();
        const width = Math.max(280, box.width);
        const height = Math.max(300, host.clientHeight || 540);
        const size = Math.min(width, height);

        svg.attr('viewBox', `0 0 ${width} ${height}`);
        projection
          .translate([width / 2, height / 2])
          .scale(size * 0.38)
          .rotate(rotation);

        sphere.datum({ type: 'Sphere' }).attr('d', path);
        graticule.attr('d', path);
        countries.attr('d', path);

        arcs.data(arcGeometry).attr('d', path);

        nodes
          .attr('cx', d => {
            const p = projection(d.coordinates);
            return p ? p[0] : -100;
          })
          .attr('cy', d => {
            const p = projection(d.coordinates);
            return p ? p[1] : -100;
          })
          .style('opacity', d => {
            const angle = d3.geoDistance([-rotation[0], -rotation[1]], d.coordinates);
            return angle < Math.PI / 2 ? 1 : 0;
          });

        const cr = projection(hubs[0].coordinates);
        if (cr) costaRicaLabel.attr('transform', `translate(${cr[0] + 10}, ${cr[1] - 52})`);
      }

      let started = performance.now();
      const tick = (now) => {
        const elapsed = now - started;
        draw([-18 + elapsed * 0.004, -10]);
        if (!prefersReducedMotion && !disposed) frame = requestAnimationFrame(tick);
      };

      draw();
      if (!prefersReducedMotion) frame = requestAnimationFrame(tick);

      let resizeFrame;
      const handleResize = () => {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(() => draw());
      };
      window.addEventListener('resize', handleResize, { passive: true });
      host._handleResize = handleResize;
    };

    render().catch(() => {
      if (host) host.innerHTML = '<div class="globe-fallback">[ GLOBE OFFLINE ]</div>';
    });

    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      if (host._handleResize) window.removeEventListener('resize', host._handleResize);
      d3.select(host).selectAll('*').remove();
    };
  }, []);

  return <div className="cyber-globe" ref={hostRef} />;
}
