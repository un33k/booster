"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const defaults_1 = require("./defaults");
const axiosRetry = require('axios-retry');
const requests = axios_1.default.create({ timeout: defaults_1.DefaultNetworkTimeout });
axiosRetry(requests, {
    retries: 3,
    retryDelay: (retryCount) => {
        return retryCount * defaults_1.DefaultRetryBackoffMultiplier;
    }
});
exports.default = requests;
