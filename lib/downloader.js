"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const utils_1 = require("./utils");
const flush_1 = require("./flush");
exports.downloadChunks = (params) => {
    const concurrentFetch = [];
    const rangeList = utils_1.getRange(params);
    rangeList.forEach(item => {
        concurrentFetch.push(utils_1.getChunk(params.url, item.start, item.end, params.verbosity));
    });
    const fetchGroups = utils_1.splitChuckList(concurrentFetch, params.concurrentChunks);
    if (params.verbosity > types_1.Verbosity.Two) {
        console.log(fetchGroups);
    }
    const fd = flush_1.getFileDesc(params.output, params.verbosity);
    for (let i = 0, len = fetchGroups.length; i < len; i++) {
        Promise.all(fetchGroups[i])
            .then(resp => {
            resp.forEach(item => {
                flush_1.writeToFile(fd, item, params.verbosity);
            });
        })
            .catch(function (err) {
            console.log(err.message);
            return;
        });
    }
};
