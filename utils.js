const fs = require('fs');
function readFile(filenname) {
    return fs.readFileSync(__dirname + '/' + filenname, 'utf-8');
}

exports.readFile = readFile;