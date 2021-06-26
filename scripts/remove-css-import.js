const fs = require('fs');
const path = require('path');

const dtsPath = path.resolve(__dirname, '../dist/dts/index.d.ts');
const importStyleRE = /^import\s+('|").*\.(less|css)\1;?$/gm;

function removeCSSImport() {
  const dts = fs.readFileSync(dtsPath, 'utf-8');
  fs.writeFileSync(dtsPath, dts.replace(importStyleRE, ''));
}

module.exports.removeCSSImport = removeCSSImport;

if (require.main === module) {
  removeCSSImport();
}
