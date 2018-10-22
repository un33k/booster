"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const axiosRetry = require('axios-retry');
const fs_1 = require("fs");
const lodash_1 = require("lodash");
const boostware_types_1 = require("./boostware.types");
axiosRetry(axios_1.default, {
    retries: 3,
    retryDelay: (retryCount) => {
        return retryCount * 1000;
    }
});
exports.checkStatus = (resp) => {
    if (resp.ok) {
        return resp;
    }
    throw Error(resp.statusText);
};
exports.getContentLength = (url, logLevel = boostware_types_1.LogLevel.One) => {
    return axios_1.default
        .head(url)
        .then(resp => {
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
exports.getChunk = (url, start, end, logLevel = boostware_types_1.LogLevel.One) => {
    return axios_1.default
        .request({ url, responseType: 'arraybuffer' })
        .then(resp => {
        const outputFilename = '/tmp/file.mp3';
        fs_1.default.writeFileSync(outputFilename, resp.data);
        return outputFilename;
    })
        .catch(err => {
        console.log('Error while fetching:', err.message);
    });
};
