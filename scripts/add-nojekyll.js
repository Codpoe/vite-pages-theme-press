const fs = require('fs');
const path = require('path');

const nojekyllFile = path.resolve(__dirname, '../docs/dist/.nojekyll');

function addNojekyll() {
  if (fs.existsSync(nojekyllFile)) {
    return;
  }

  fs.writeFileSync(nojekyllFile, '');
}

module.exports.addCSSImport = addNojekyll;

if (require.main === module) {
  addNojekyll();
}
