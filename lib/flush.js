"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const fs = require('fs');
exports.getFileDesc = (fileName, verbosity = types_1.Verbosity.One) => {
    const fd = fs.openSync(fileName, 'w+');
    if (verbosity > types_1.Verbosity.Two) {
        console.log(`File created (${fileName})`);
    }
    return fd;
};
exports.writeToFile = (fd, chunck, verbosity = types_1.Verbosity.One) => {
    const offset = 0;
    const range = chunck.range;
    const position = range.start;
    const length = range.end - range.start + 1;
    fs.write(fd, chunck.data, offset, length, position, (err) => {
        if (verbosity > types_1.Verbosity.Two) {
            console.log(`Wrote [${chunck.range.start}, ${chunck.range.end}] to file.`);
        }
    });
};
exports.fileExists = (fileName) => {
    const exists = fs.existsSync(fileName);
    return exists;
};
