/* node build.js – собирает статические страницы из src/ в корень папки */
const fs = require('fs');
const path = require('path');

const pages = { 'v1.html': './src/tpl-v1', 'v2.html': './src/tpl-v2', 'wow.html': './src/tpl-wow', 'wow2.html': './src/tpl-wow2', 'index.html': './src/tpl-index' };

for (const [file, mod] of Object.entries(pages)) {
  if (!fs.existsSync(path.join(__dirname, mod + '.js'))) { console.log('skip', file); continue; }
  fs.writeFileSync(path.join(__dirname, file), require(mod)(), 'utf8');
  console.log('ok  ', file);
}
