/**
 * Build script: generates dist/coalition-map.html
 * Uses d3-geo + us-atlas to create an accurate SVG US map
 * with interactive city dots for the NGIN Alliance coalitions.
 */
const fs = require('fs');
const path = require('path');
const d3 = require('d3-geo');
const topojson = require('topojson-client');

// Load US atlas (unprojected, so we can use same projection for states + cities)
const us = JSON.parse(
  fs.readFileSync(require.resolve('us-atlas/states-10m.json'), 'utf-8')
);

// Set up Albers USA projection (auto-handles Hawaii + Alaska insets)
const nation = topojson.feature(us, us.objects.nation);
const projection = d3.geoAlbersUsa().fitSize([960, 600], nation);
const geoPath = d3.geoPath(projection);

// Generate SVG paths for states
const stateFeatures = topojson.feature(us, us.objects.states).features;
const statePaths = stateFeatures
  .map(f => {
    const d = geoPath(f);
    return d ? `<path d="${d}" class="state"/>` : '';
  })
  .filter(Boolean)
  .join('\n    ');

// Generate state border mesh
const borderMesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
const borderPath = geoPath(borderMesh);

// Generate nation outline
const nationPath = geoPath(nation);

// City data — all 21 coalition cities
const cities = [
  { name: "Bangor", state: "ME", lat: 44.8016, lng: -68.7712, caseStudy: true, slug: "/case-studies/bangor-me" },
  { name: "Providence", state: "RI", lat: 41.824, lng: -71.4128, caseStudy: false },
  { name: "Pottstown", state: "PA", lat: 40.2454, lng: -75.6496, caseStudy: false },
  { name: "Pittsburgh", state: "PA", lat: 40.4406, lng: -79.9959, caseStudy: false },
  { name: "Detroit", state: "MI", lat: 42.3314, lng: -83.0458, caseStudy: true, slug: "/case-studies/detroit-mi" },
  { name: "Cleveland", state: "OH", lat: 41.4993, lng: -81.6944, caseStudy: true, slug: "/case-studies/cleveland-oh" },
  { name: "Milwaukee", state: "WI", lat: 43.0389, lng: -87.9065, caseStudy: false },
  { name: "Omaha", state: "NE", lat: 41.2565, lng: -95.9345, caseStudy: true, slug: "/case-studies/omaha-ne" },
  { name: "Memphis", state: "TN", lat: 35.1495, lng: -90.049, caseStudy: false },
  { name: "Greenville", state: "MS", lat: 33.4101, lng: -91.0618, caseStudy: false },
  { name: "Shreveport", state: "LA", lat: 32.5252, lng: -93.7502, caseStudy: true, slug: "/case-studies/shreveport-la" },
  { name: "Baton Rouge", state: "LA", lat: 30.4515, lng: -91.1871, caseStudy: false },
  { name: "New Orleans", state: "LA", lat: 29.9511, lng: -90.0715, caseStudy: true, slug: "/case-studies/new-orleans-la" },
  { name: "Houston", state: "TX", lat: 29.7604, lng: -95.3698, caseStudy: false },
  { name: "Tampa", state: "FL", lat: 27.9506, lng: -82.4572, caseStudy: false },
  { name: "Sarasota", state: "FL", lat: 27.3364, lng: -82.5307, caseStudy: true, slug: "/case-studies/sarasota-fl" },
  { name: "El Paso", state: "TX", lat: 31.7619, lng: -106.445, caseStudy: false },
  { name: "Santa Fe", state: "NM", lat: 35.687, lng: -105.9378, caseStudy: false },
  { name: "San Diego", state: "CA", lat: 32.7157, lng: -117.1611, caseStudy: false },
  { name: "Sacramento", state: "CA", lat: 38.5816, lng: -121.4944, caseStudy: true, slug: "/case-studies/sacramento-ca" },
  { name: "Honolulu", state: "HI", lat: 21.3069, lng: -157.8583, caseStudy: true, slug: "/case-studies/honolulu-hi" },
];

// Project city coordinates
const projectedCities = cities.map(city => {
  const coords = projection([city.lng, city.lat]);
  if (!coords) return null;
  return { ...city, x: coords[0].toFixed(1), y: coords[1].toFixed(1) };
}).filter(Boolean);

// Custom label offsets for crowded areas
// [dx, dy, anchor] — anchor: 'start' (right of dot), 'end' (left of dot)
const labelOffsets = {
  'Bangor':       [9, 4, 'start'],
  'Providence':   [9, 4, 'start'],
  'Pottstown':    [9, -4, 'start'],
  'Pittsburgh':   [9, 4, 'start'],
  'Detroit':      [9, -2, 'start'],
  'Cleveland':    [9, 4, 'start'],
  'Milwaukee':    [9, -6, 'start'],
  'Omaha':        [9, 4, 'start'],
  'Memphis':      [9, 4, 'start'],
  'Greenville':   [9, 4, 'start'],
  'Shreveport':   [9, -2, 'start'],
  'Baton Rouge':  [-9, -4, 'end'],
  'New Orleans':  [9, 12, 'start'],
  'Houston':      [-9, 4, 'end'],
  'Tampa':        [9, -2, 'start'],
  'Sarasota':     [9, 8, 'start'],
  'El Paso':      [9, 4, 'start'],
  'Santa Fe':     [9, 4, 'start'],
  'San Diego':    [-9, 4, 'end'],
  'Sacramento':   [-9, 4, 'end'],
  'Honolulu':     [9, 4, 'start'],
};

// Generate city dot SVG
const cityDots = projectedCities.map(city => {
  const cls = city.caseStudy ? 'dot dot--case-study' : 'dot';
  const dataAttrs = city.caseStudy
    ? `data-slug="${city.slug}" data-case-study="true"`
    : '';
  const [dx, dy, anchor] = labelOffsets[city.name] || [9, 4, 'start'];
  const labelX = parseFloat(city.x) + dx;
  const labelY = parseFloat(city.y) + dy;
  const labelCls = city.caseStudy ? 'city-label city-label--case-study' : 'city-label';
  return `<g class="dot-group" data-city="${city.name}, ${city.state}" ${dataAttrs}>
      <circle cx="${city.x}" cy="${city.y}" r="8" class="dot-pulse"/>
      <circle cx="${city.x}" cy="${city.y}" r="5.5" class="${cls}"/>
      <text x="${labelX}" y="${labelY}" class="${labelCls}" text-anchor="${anchor}">${city.name}</text>
    </g>`;
}).join('\n    ');

// Build complete HTML
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>NGIN Alliance Coalition Map</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: transparent;
    overflow: hidden;
  }

  .map-container {
    position: relative;
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
  }

  .map-svg {
    width: 100%;
    height: auto;
    display: block;
  }

  /* City labels */
  .city-label {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 9px;
    font-weight: 500;
    fill: #4a5568;
    pointer-events: none;
    user-select: none;
  }

  .city-label--case-study {
    fill: #1e2930;
    font-weight: 600;
  }

  .dot-group:hover .city-label {
    fill: #1e2930;
    font-weight: 700;
  }

  /* States */
  .state {
    fill: #e9eef3;
    stroke: #fff;
    stroke-width: 0.75;
    stroke-linejoin: round;
  }

  .state-borders {
    fill: none;
    stroke: #fff;
    stroke-width: 0.75;
    stroke-linejoin: round;
  }

  .nation-border {
    fill: none;
    stroke: #c0cad4;
    stroke-width: 1.2;
    stroke-linejoin: round;
  }

  /* Dots */
  .dot-group { cursor: default; }
  .dot-group[data-case-study="true"] { cursor: pointer; }

  .dot-pulse {
    fill: #caddbb;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .dot-group:hover .dot-pulse,
  .dot-group:focus-within .dot-pulse {
    opacity: 0.3;
  }

  .dot {
    fill: #1e2930;
    stroke: #fff;
    stroke-width: 1.5;
    transition: r 0.2s ease, fill 0.2s ease;
  }

  .dot--case-study {
    fill: #caddbb;
    stroke: #1e2930;
    stroke-width: 1.5;
  }

  .dot-group:hover .dot,
  .dot-group:focus-within .dot {
    r: 7;
  }

  .dot-group[data-case-study="true"]:hover .dot,
  .dot-group[data-case-study="true"]:focus-within .dot {
    fill: #b8d0a3;
  }

  /* Tooltip */
  .tooltip {
    position: absolute;
    pointer-events: none;
    background: #1e2930;
    color: #fff;
    padding: 8px 14px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.4;
    white-space: nowrap;
    opacity: 0;
    transform: translateY(4px);
    transition: opacity 0.2s ease, transform 0.2s ease;
    z-index: 100;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  .tooltip.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .tooltip__label {
    display: block;
    font-weight: 600;
  }

  .tooltip__sub {
    display: block;
    font-size: 11px;
    font-weight: 400;
    opacity: 0.7;
    margin-top: 2px;
  }

  /* Legend */
  .legend {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    padding: 12px 0 4px;
    font-size: 13px;
    color: #4a5568;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .legend-dot--case-study {
    background: #caddbb;
    border: 1.5px solid #1e2930;
  }

  .legend-dot--coalition {
    background: #1e2930;
    border: 1.5px solid #fff;
    box-shadow: 0 0 0 0.5px #ccc;
  }

  /* Mobile */
  @media (max-width: 600px) {
    .legend {
      gap: 16px;
      font-size: 12px;
    }
    .tooltip {
      font-size: 12px;
      padding: 6px 10px;
    }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      transition-duration: 0.01ms !important;
    }
  }
</style>
</head>
<body>

<div class="map-container" id="mapContainer">
  <svg class="map-svg" viewBox="0 0 960 600" xmlns="http://www.w3.org/2000/svg">
    <!-- State fills -->
    ${statePaths}

    <!-- State borders -->
    <path d="${borderPath}" class="state-borders"/>

    <!-- Nation outline -->
    <path d="${nationPath}" class="nation-border"/>

    <!-- City dots -->
    ${cityDots}
  </svg>

  <div class="tooltip" id="tooltip">
    <span class="tooltip__label" id="tooltipLabel"></span>
    <span class="tooltip__sub" id="tooltipSub"></span>
  </div>
</div>

<div class="legend">
  <div class="legend-item">
    <div class="legend-dot legend-dot--case-study"></div>
    <span>Case Study City</span>
  </div>
  <div class="legend-item">
    <div class="legend-dot legend-dot--coalition"></div>
    <span>Coalition City</span>
  </div>
</div>

<script>
(function () {
  var container = document.getElementById('mapContainer');
  var tooltip = document.getElementById('tooltip');
  var label = document.getElementById('tooltipLabel');
  var sub = document.getElementById('tooltipSub');
  var dots = document.querySelectorAll('.dot-group');

  function showTooltip(e, dot) {
    var city = dot.getAttribute('data-city');
    var isCaseStudy = dot.getAttribute('data-case-study') === 'true';

    label.textContent = city;
    sub.textContent = isCaseStudy ? 'View Case Study \\u2192' : 'Alliance Coalition';

    tooltip.classList.add('is-visible');
    positionTooltip(e);
  }

  function positionTooltip(e) {
    var rect = container.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    var tipW = tooltip.offsetWidth;
    var tipH = tooltip.offsetHeight;

    var left = x - tipW / 2;
    var top = y - tipH - 14;

    // Keep tooltip in bounds
    if (left < 4) left = 4;
    if (left + tipW > rect.width - 4) left = rect.width - tipW - 4;
    if (top < 4) top = y + 20; // flip below if too high

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
  }

  function hideTooltip() {
    tooltip.classList.remove('is-visible');
  }

  dots.forEach(function (dot) {
    dot.addEventListener('mouseenter', function (e) { showTooltip(e, dot); });
    dot.addEventListener('mousemove', function (e) { positionTooltip(e); });
    dot.addEventListener('mouseleave', hideTooltip);

    // Click navigation for case study cities
    if (dot.getAttribute('data-case-study') === 'true') {
      dot.addEventListener('click', function () {
        var slug = dot.getAttribute('data-slug');
        if (slug) {
          // Navigate parent frame if in iframe, else current window
          if (window.parent !== window) {
            window.parent.location.href = slug;
          } else {
            window.location.href = slug;
          }
        }
      });
    }

    // Touch support
    dot.addEventListener('touchstart', function (e) {
      e.preventDefault();
      var touch = e.touches[0];
      showTooltip(touch, dot);

      // Auto-hide after 3s unless it's a case study (user might want to tap again to navigate)
      if (dot.getAttribute('data-case-study') !== 'true') {
        setTimeout(hideTooltip, 3000);
      }
    }, { passive: false });
  });

  // Hide tooltip on touch outside
  document.addEventListener('touchstart', function (e) {
    if (!e.target.closest('.dot-group')) {
      hideTooltip();
    }
  });
})();
</script>

</body>
</html>`;

// Write output
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(path.join(distDir, 'coalition-map.html'), html);
console.log('✓ Built dist/coalition-map.html');
