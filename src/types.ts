/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

/**
 * Loglevel - verbosity level
 * 1 = least and 3 = most (verbose)
 */
export enum Verbosity {
  One = 1,
  Two = 2,
  Three = 3
}

/**
 * Booster parameters
 */
export interface BoosterParams {
  // link to remote file
  url: string;
  // path to output file
  output: string;
  // if download chunks in parallel
  boost: boolean;
  // chucks to be downloaded concurrently
  concurrentChunks: number;
  // size of each chunk (bytes)
  chunkSize: number;
  // total number of chunck to download (if partial file download)
  maxChunks: number;
  // verbosity log lelvel
  verbosity: Verbosity;
  // overwrite file if exist
  force: boolean;
  // file size
  fileSize: number;
}

/**
 * Data (chuck) Range (start, end)
 */
export interface DataRange {
  // staring byte
  start: number;
  // ending byte
  end: number;
}

/**
 * Chuck Data
 */
export interface PartialChuckData {
  // actual chunck data
  data: any;
  // range of partial chunk
  range: DataRange;
}
