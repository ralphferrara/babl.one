const fs = require('fs');
fs.copyFileSync('../../global/template.cjs', './template.cjs');
fs.copyFileSync('../../global/tsconfig.json', './tsconfig.json');