/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

const program = require('commander');
const path = require('path');
import { getContentLength, getMaxChunks } from './utils';
import { DefaultBoosterParams } from './defaults';
import { Verbosity } from './types';
import { downloadChunks } from './downloader';
import { fileExists } from './flush';

/**
 * Get params from command line
 */
async function getParams() {
  const params = DefaultBoosterParams;
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
    if (params.verbosity > Verbosity.One) {
      console.log(`Destination file ${params.output}`);
    }
  }

  if (fileExists(params.output) && !params.force) {
    console.log(`File already exists. Use the --force option to overwrite`);
    throw Error('File already exists');
  }

  const length = await getContentLength(params.url, params.verbosity);
  if (!length && length <= 0) {
    console.log(`Invalid URL or unable to determin file size.`);
    throw Error('Missing params');
  }
  params.fileSize = length;
  if (params.verbosity > Verbosity.One) {
    console.log(`File size to fetch: (${length})`);
  }

  if (params.chunkSize > params.fileSize) {
    params.chunkSize = params.fileSize;
  }

  params.maxChunks = await getMaxChunks(params);
  if (params.verbosity > Verbosity.One) {
    console.log('Params', params);
  }
  return params;
}

/**
 * Run main task
 */
async function main() {
  const params = await getParams();
  await downloadChunks(params);
}

/**
 * Add command options
 */
program
  .version('0.1.0')
  .usage('<url> [-o] [-b [-msc]] [-f] [-v]')
  .option('-o, --output <n>', 'path to save file to')
  .option('-b, --boost', 'boost download multiple concurrent chunk fetch')
  .option('-m, --max-chunks <n>', 'total number of chunks to fetch', parseInt)
  .option('-s, --chunk-size <n>', 'size of each chunk to fetch', parseInt)
  .option(
    '-c, --concurrent-chunks <n>',
    'number of chunks fetched concurrently',
    parseInt
  )
  .option('-f, --force', 'overwrite if file already exists')
  .option('-v, --verbosity <n>', 'log verbosity (1,2,3)', parseInt)
  .parse(process.argv);

/**
 * Run command
 */
main().catch(err => {
  // console.error(err);
  process.exit(111);
});
