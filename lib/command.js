"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const program = require('commander');
const path = require('path');
const utils_1 = require("./utils");
const defaults_1 = require("./defaults");
const types_1 = require("./types");
const downloader_1 = require("./downloader");
const flush_1 = require("./flush");
function getParams() {
    return __awaiter(this, void 0, void 0, function* () {
        const params = defaults_1.DefaultBoosterParams;
        params.boost = program.boost || params.boost;
        params.maxChunks = program.maxChunks || params.maxChunks;
        params.chunkSize = program.chunkSize || params.chunkSize;
        params.concurrentChunks = program.concurrentChunks || params.concurrentChunks;
        params.output = program.output || params.output;
        params.verbosity = program.verbosity || params.verbosity;
        params.force = program.force || params.force;
        if (process.argv.length < 3) {
            console.log('Missing required params. <url> ...');
            console.log(program.outputHelp());
            throw Error('Missing params');
        }
        params.url = process.argv[2];
        if (!params.url.includes('://')) {
            console.log('URL must start with protocol. (Ex: http://, https://, ftp://, etc.)');
            console.log(program.outputHelp());
            throw Error('Missing params');
        }
        if (!params.output) {
            params.output = path.basename(params.url);
            if (params.verbosity > types_1.Verbosity.One) {
                console.log(`Destination file ${params.output}`);
            }
        }
        if (flush_1.fileExists(params.output) && !params.force) {
            console.log(`File already exists. Use the --force option to overwrite`);
            throw Error('File already exists');
        }
        const length = yield utils_1.getContentLength(params.url, params.verbosity);
        if (!length && length <= 0) {
            console.log(`Invalid URL or unable to determin file size.`);
            throw Error('Missing params');
        }
        params.fileSize = length;
        if (params.verbosity > types_1.Verbosity.One) {
            console.log(`File size to fetch: (${length})`);
        }
        if (params.chunkSize > params.fileSize) {
            params.chunkSize = params.fileSize;
        }
        params.maxChunks = yield utils_1.getMaxChunks(params);
        if (params.verbosity > types_1.Verbosity.One) {
            console.log('Params', params);
        }
        return params;
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const params = yield getParams();
        yield downloader_1.downloadChunks(params);
    });
}
program
    .version('0.1.0')
    .usage('<url> [-b [-msc]] [-o] [-v]')
    .option('-o, --output <n>', 'path to save file to')
    .option('-b, --boost', 'boost download multiple concurrent chunk fetch')
    .option('-m, --max-chunks <n>', 'total number of chunks to fetch', parseInt)
    .option('-s, --chunk-size <n>', 'size of each chunk to fetch', parseInt)
    .option('-c, --concurrent-chunks <n>', 'number of chunks fetched concurrently', parseInt)
    .option('-f, --force', 'overwrite if file already exists')
    .option('-v, --verbosity <n>', 'log verbosity (1,2,3)', parseInt)
    .parse(process.argv);
main().catch(err => {
    process.exit(111);
});
