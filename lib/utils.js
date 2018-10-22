"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const types_1 = require("./types");
const request_1 = require("./request");
exports.getContentLength = (url, verbosity = types_1.Verbosity.One) => {
    return request_1.default
        .head(url)
        .then(resp => {
        if (verbosity > types_1.Verbosity.Two) {
            console.log('Header', resp.headers);
        }
        if (resp.status === 200) {
            return lodash_1.get(resp, 'headers.content-length', undefined);
        }
        else {
            console.log(`Failed to fetch file length (${resp.statusText})`);
            return undefined;
        }
    })
        .catch(err => {
        console.log('Error while fetching:', err.message);
    });
};
exports.getChunk = (url, start, end, verbosity = types_1.Verbosity.One) => {
    return request_1.default
        .request({
        url,
        method: 'get',
        headers: { Range: `bytes=${start}-${end}` },
        responseType: 'arraybuffer'
    })
        .then(resp => {
        if (verbosity > types_1.Verbosity.Two) {
            console.log(`Fetching chunk range: [${start}, ${end}]`);
        }
        return { data: resp.data, range: { start, end } };
    })
        .catch(err => {
        console.log('Error while fetching:', err.message);
    });
};
exports.getMaxChunks = (params) => {
    let totalChunks = 1;
    if (params.chunkSize > params.fileSize) {
        return totalChunks;
    }
    totalChunks = params.fileSize / params.chunkSize;
    if (params.fileSize % params.chunkSize > 0) {
        totalChunks += 1;
    }
    totalChunks = Math.ceil(totalChunks);
    if (params.maxChunks > 0) {
        totalChunks = Math.min(totalChunks, params.maxChunks);
    }
    return totalChunks;
};
exports.getRange = (params) => {
    const rangeList = [];
    let idx = 0;
    let start = 0;
    let end = params.chunkSize;
    while (idx < params.maxChunks) {
        if (idx === 0) {
            end = start + params.chunkSize - 1;
        }
        else {
            start = idx * params.chunkSize;
            end = start + params.chunkSize - 1;
        }
        if (start >= params.fileSize) {
            break;
        }
        if (end >= params.fileSize) {
            end = params.fileSize - 1;
        }
        rangeList.push({ start, end });
        idx += 1;
    }
    if (params.verbosity > types_1.Verbosity.Two) {
        console.log(rangeList);
    }
    return rangeList;
};
exports.splitChuckList = (list, size) => {
    return list.reduce(function (r, a, i) {
        var p = Math.floor(i / size);
        r[p] = r[p] || [];
        r[p].push(a);
        return r;
    }, []);
};
