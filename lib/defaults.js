"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
exports.DefaultChuckSize = 1024 * 1024;
exports.DefaultRetryDelay = 1000;
exports.DefaultRetries = 3;
exports.DefaultVerbosity = types_1.Verbosity.One;
exports.DefaultMaxConcurrentChunks = 4;
exports.DefaultNetworkTimeout = 6000;
exports.DefaultRetryBackoffMultiplier = 1000;
exports.DefaultBoosterParams = {
    url: '',
    output: '',
    boost: false,
    concurrentChunks: exports.DefaultMaxConcurrentChunks,
    chunkSize: exports.DefaultChuckSize,
    maxChunks: -1,
    verbosity: types_1.Verbosity.One,
    force: false,
    fileSize: 0
};
