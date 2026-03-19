const fs = require('fs');
const path = require('path');

const CSS_DIR = path.join(__dirname, 'src', 'css');
const JS_DIR = path.join(__dirname, 'src', 'js');
const DIST_DIR = path.join(__dirname, 'dist');

// Ensure dist exists
if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });

// Concat CSS files in order
const cssOrder = [
  'variables.css',
  'global.css',
  'components.css',
  'sections.css',
  'responsive.css'
];

let css = `/* NGIN Alliance Playbook — Custom Styles */\n/* Auto-built: ${new Date().toISOString()} */\n\n`;

for (const file of cssOrder) {
  const filePath = path.join(CSS_DIR, file);
  if (fs.existsSync(filePath)) {
    css += `/* === ${file} === */\n`;
    css += fs.readFileSync(filePath, 'utf8') + '\n\n';
  }
}

fs.writeFileSync(path.join(DIST_DIR, 'ngin-playbook.css'), css);
console.log('✓ Built dist/ngin-playbook.css');

// Concat JS files in order
const jsOrder = [
  'components.js',
  'init.js'
];

let js = `/* NGIN Alliance Playbook — Custom Scripts */\n/* Auto-built: ${new Date().toISOString()} */\n\n`;

for (const file of jsOrder) {
  const filePath = path.join(JS_DIR, file);
  if (fs.existsSync(filePath)) {
    js += `/* === ${file} === */\n`;
    js += fs.readFileSync(filePath, 'utf8') + '\n\n';
  }
}

fs.writeFileSync(path.join(DIST_DIR, 'ngin-playbook.js'), js);
console.log('✓ Built dist/ngin-playbook.js');

// Copy index.html to dist for Cloudflare Pages
const indexSrc = path.join(__dirname, 'src', 'index.html');
if (fs.existsSync(indexSrc)) {
  fs.copyFileSync(indexSrc, path.join(DIST_DIR, 'index.html'));
}

// Write _headers for Cloudflare Pages (no-cache during active dev)
fs.writeFileSync(path.join(DIST_DIR, '_headers'), `/*
  Access-Control-Allow-Origin: *
  Cache-Control: no-cache, no-store, must-revalidate
  Pragma: no-cache
  Expires: 0
`);

// Write version file for cache busting
var version = Date.now().toString(36);
fs.writeFileSync(path.join(DIST_DIR, 'version.txt'), version);
console.log('✓ Version: ' + version);
console.log('✓ Built dist/_headers');
