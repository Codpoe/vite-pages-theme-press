const fs = require('fs');
const path = require('path');

const bundlePath = path.resolve(__dirname, '../dist/index.es.js');
const importStatement = `import './style.css';`;

function addCSSImport() {
  let bundle = fs.readFileSync(bundlePath, 'utf-8');

  if (bundle.includes(importStatement)) {
    return;
  }

  bundle = `${importStatement}\n${bundle}`;
  fs.writeFileSync(bundlePath, bundle);
}

module.exports.addCSSImport = addCSSImport;

if (require.main === module) {
  addCSSImport();
}
