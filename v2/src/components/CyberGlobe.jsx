import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const hubs = [
  { name: 'Costa Rica', code: 'CR', coordinates: [-84.09, 9.75], primary: true },
  { name: 'San Francisco', code: 'US-W', coordinates: [-122.42, 37.77] },
  { name: 'New York', code: 'US-E', coordinates: [-74.01, 40.71] },
  { name: 'Toronto', code: 'CA', coordinates: [-79.38, 43.65] },
  { name: 'São Paulo', code: 'BR', coordinates: [-46.63, -23.55] },
  { name: 'London', code: 'UK', coordinates: [-0.13, 51.51] },
  { name: 'Madrid', code: 'ES', coordinates: [-3.7, 40.42] },
  { name: 'Berlin', code: 'DE', coordinates: [13.4, 52.52] },
  { name: 'Dubai', code: 'AE', coordinates: [55.27, 25.2] },
  { name: 'Mumbai', code: 'IN', coordinates: [72.88, 19.07] },
  { name: 'Singapore', code: 'SG', coordinates: [103.82, 1.35] },
  { name: 'Tokyo', code: 'JP', coordinates: [139.69, 35.68] },
  { name: 'Sydney', code: 'AU', coordinates: [151.21, -33.87] },
];

const eventTypes = [
  { name: 'PORT SCAN', severity: 'medium' },
  { name: 'RECON PROBE', severity: 'low' },
  { name: 'AUTH ATTEMPT', severity: 'high' },
  { name: 'DNS BURST', severity: 'medium' },
  { name: 'TRAFFIC SPIKE', severity: 'medium' },
  { name: 'DISTRIBUTED PROBE', severity: 'high' },
  { name: 'SERVICE ENUM', severity: 'low' },
];

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function buildArc(from, to) {
  const interpolate = d3.geoInterpolate(from.coordinates, to.coordinates);
  return {
    type: 'LineString',
    coordinates: d3.range(0, 1.001, 0.025).map(interpolate),
  };
}

function createIdFactory() {
  let value = 0;
  return () => {
    value += 1;
    return `cyber-${value}`;
  };
}

export default function CyberGlobe() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let animationFrame;
    let resizeFrame;
    let lastFrame = performance.now();
    let lastSpawn = lastFrame;
    let nextSpawnDelay = 650;
    let rotation = [-25, -12];

    const nextId = createIdFactory();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const attacks = [];
    const impacts = [];

    const render = async () => {
      const response = await fetch(
        'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
      );
      if (!response.ok) throw new Error('Unable to load world map');

      const world = await response.json();
      if (disposed) return;

      const svg = d3
        .select(host)
        .append('svg')
        .attr('role', 'img')
        .attr('aria-label', 'Simulación global de tráfico de red y eventos de ciberseguridad');

      const defs = svg.append('defs');

      const glow = defs
        .append('filter')
        .attr('id', 'cyber-red-glow')
        .attr('x', '-80%')
        .attr('y', '-80%')
        .attr('width', '260%')
        .attr('height', '260%');

      glow.append('feGaussianBlur').attr('stdDeviation', '3.8').attr('result', 'blur');
      const merge = glow.append('feMerge');
      merge.append('feMergeNode').attr('in', 'blur');
      merge.append('feMergeNode').attr('in', 'SourceGraphic');

      const projection = d3.geoOrthographic().clipAngle(90);
      const path = d3.geoPath(projection);

      const halo = svg.append('circle').attr('class', 'globe-red-halo');
      const sphere = svg.append('path').attr('class', 'globe-sphere');
      const graticule = svg.append('path').datum(d3.geoGraticule10()).attr('class', 'globe-grid');

      const countryGroup = svg.append('g').attr('class', 'country-layer');
      const baseArcGroup = svg.append('g').attr('class', 'base-arc-layer');
      const attackArcGroup = svg.append('g').attr('class', 'attack-arc-layer');
      const nodeGroup = svg.append('g').attr('class', 'node-layer');
      const packetGroup = svg.append('g').attr('class', 'packet-layer');
      const impactGroup = svg.append('g').attr('class', 'impact-layer');

      const countries = countryGroup
        .selectAll('path')
        .data(world.features)
        .join('path')
        .attr('class', 'globe-country');

      const baseLinks = hubs
        .filter((hub) => !hub.primary)
        .map((hub) => ({
          id: `base-${hub.code}`,
          from: hubs[0],
          to: hub,
          geometry: buildArc(hubs[0], hub),
        }));

      const baseArcs = baseArcGroup
        .selectAll('path')
        .data(baseLinks)
        .join('path')
        .attr('class', 'globe-base-arc');

      const nodes = nodeGroup
        .selectAll('g')
        .data(hubs)
        .join('g')
        .attr('class', (hub) => (hub.primary ? 'hub primary' : 'hub'));

      nodes
        .append('circle')
        .attr('class', 'hub-pulse')
        .attr('r', (hub) => (hub.primary ? 12 : 8));

      nodes
        .append('circle')
        .attr('class', 'hub-core')
        .attr('r', (hub) => (hub.primary ? 5.5 : 3.2));

      const costaRicaLabel = svg.append('g').attr('class', 'cr-label');
      costaRicaLabel.append('rect').attr('rx', 5).attr('width', 142).attr('height', 42);
      costaRicaLabel.append('text').attr('x', 10).attr('y', 16).text('> COSTA RICA');
      costaRicaLabel.append('text').attr('x', 10).attr('y', 31).attr('class', 'muted').text('> PRIMARY NODE');

      const telemetry = svg.append('g').attr('class', 'globe-telemetry');
      telemetry.append('text').attr('class', 'telemetry-line telemetry-top').text('NET://GLOBAL-MESH');
      telemetry.append('text').attr('class', 'telemetry-line telemetry-bottom').text('THREAT SIMULATION ACTIVE');

      const visiblePoint = (coordinates) => {
        const center = [-rotation[0], -rotation[1]];
        const distance = d3.geoDistance(center, coordinates);
        if (distance >= Math.PI / 2) return null;
        return projection(coordinates);
      };

      const spawnAttack = () => {
        if (attacks.length >= 18) return;

        const remoteHubs = hubs.filter((hub) => !hub.primary);
        const event = randomItem(eventTypes);

        let from;
        let to;

        const pattern = Math.random();
        if (pattern < 0.48) {
          from = randomItem(remoteHubs);
          to = hubs[0];
        } else if (pattern < 0.76) {
          from = hubs[0];
          to = randomItem(remoteHubs);
        } else {
          from = randomItem(remoteHubs);
          do {
            to = randomItem(remoteHubs);
          } while (to.code === from.code);
        }

        attacks.push({
          id: nextId(),
          from,
          to,
          event,
          geometry: buildArc(from, to),
          progress: 0,
          speed: 0.00024 + Math.random() * 0.00018,
        });
      };

      const spawnImpact = (attack) => {
        impacts.push({
          id: nextId(),
          target: attack.to,
          severity: attack.event.severity,
          life: 1,
        });

        if (impacts.length > 14) impacts.shift();
      };

      const drawStatic = () => {
        const width = Math.max(280, host.clientWidth || 280);
        const height = Math.max(320, host.clientHeight || 540);
        const size = Math.min(width, height);

        svg.attr('viewBox', `0 0 ${width} ${height}`);

        projection
          .translate([width / 2, height / 2])
          .scale(size * 0.39)
          .rotate(rotation);

        const radius = size * 0.39;

        halo
          .attr('cx', width / 2)
          .attr('cy', height / 2)
          .attr('r', radius + 20);

        sphere.datum({ type: 'Sphere' }).attr('d', path);
        graticule.attr('d', path);
        countries.attr('d', path);
        baseArcs.attr('d', (link) => path(link.geometry));

        nodes.attr('transform', (hub) => {
          const point = visiblePoint(hub.coordinates);
          return point ? `translate(${point[0]}, ${point[1]})` : 'translate(-9999,-9999)';
        });

        const primaryPoint = visiblePoint(hubs[0].coordinates);
        if (primaryPoint) {
          costaRicaLabel.attr(
            'transform',
            `translate(${primaryPoint[0] + 14}, ${primaryPoint[1] - 52})`
          );
        } else {
          costaRicaLabel.attr('transform', 'translate(-9999,-9999)');
        }

        telemetry.select('.telemetry-top').attr('x', 18).attr('y', 24);
        telemetry.select('.telemetry-bottom').attr('x', 18).attr('y', height - 18);
      };

      const drawDynamic = (delta) => {
        attacks.forEach((attack) => {
          attack.progress += attack.speed * delta;
        });

        for (let index = attacks.length - 1; index >= 0; index -= 1) {
          if (attacks[index].progress >= 1) {
            spawnImpact(attacks[index]);
            attacks.splice(index, 1);
          }
        }

        for (let index = impacts.length - 1; index >= 0; index -= 1) {
          impacts[index].life -= delta * 0.00135;
          if (impacts[index].life <= 0) impacts.splice(index, 1);
        }

        attackArcGroup
          .selectAll('path')
          .data(attacks, (attack) => attack.id)
          .join(
            (enter) =>
              enter
                .append('path')
                .attr('class', (attack) => `globe-attack-arc severity-${attack.event.severity}`),
            (update) =>
              update.attr('class', (attack) => `globe-attack-arc severity-${attack.event.severity}`),
            (exit) => exit.remove()
          )
          .attr('d', (attack) => path(attack.geometry));

        packetGroup
          .selectAll('circle')
          .data(attacks, (attack) => attack.id)
          .join(
            (enter) =>
              enter
                .append('circle')
                .attr('filter', 'url(#cyber-red-glow)')
                .attr('r', 3),
            (update) => update,
            (exit) => exit.remove()
          )
          .attr('class', (attack) => `globe-packet severity-${attack.event.severity}`)
          .attr('cx', (attack) => {
            const coordinate = d3.geoInterpolate(
              attack.from.coordinates,
              attack.to.coordinates
            )(Math.min(attack.progress, 1));
            const point = visiblePoint(coordinate);
            return point ? point[0] : -9999;
          })
          .attr('cy', (attack) => {
            const coordinate = d3.geoInterpolate(
              attack.from.coordinates,
              attack.to.coordinates
            )(Math.min(attack.progress, 1));
            const point = visiblePoint(coordinate);
            return point ? point[1] : -9999;
          });

        impactGroup
          .selectAll('circle')
          .data(impacts, (impact) => impact.id)
          .join(
            (enter) => enter.append('circle').attr('fill', 'none'),
            (update) => update,
            (exit) => exit.remove()
          )
          .attr('class', (impact) => `globe-impact severity-${impact.severity}`)
          .attr('cx', (impact) => {
            const point = visiblePoint(impact.target.coordinates);
            return point ? point[0] : -9999;
          })
          .attr('cy', (impact) => {
            const point = visiblePoint(impact.target.coordinates);
            return point ? point[1] : -9999;
          })
          .attr('r', (impact) => 6 + (1 - impact.life) * 25)
          .style('opacity', (impact) => Math.max(0, impact.life * 0.85));
      };

      const tick = (now) => {
        if (disposed) return;

        const delta = Math.min(34, now - lastFrame);
        lastFrame = now;

        rotation = [-25 + now * 0.0037, -12];

        if (now - lastSpawn >= nextSpawnDelay) {
          spawnAttack();
          if (Math.random() > 0.7) spawnAttack();
          lastSpawn = now;
          nextSpawnDelay = 420 + Math.random() * 720;
        }

        drawStatic();
        drawDynamic(delta);

        if (!prefersReducedMotion) {
          animationFrame = requestAnimationFrame(tick);
        }
      };

      for (let index = 0; index < 8; index += 1) spawnAttack();

      drawStatic();
      drawDynamic(0);

      if (!prefersReducedMotion) {
        animationFrame = requestAnimationFrame(tick);
      }

      const handleResize = () => {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(() => {
          drawStatic();
          drawDynamic(0);
        });
      };

      window.addEventListener('resize', handleResize, { passive: true });
      host._handleResize = handleResize;
    };

    render().catch(() => {
      if (host) {
        host.innerHTML = '<div class="globe-fallback">[ CYBER GLOBE OFFLINE ]</div>';
      }
    });

    return () => {
      disposed = true;
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      if (host._handleResize) window.removeEventListener('resize', host._handleResize);
      d3.select(host).selectAll('*').remove();
    };
  }, []);

  return <div className="cyber-globe" ref={hostRef} />;
}
