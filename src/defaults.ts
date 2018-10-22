/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { Verbosity, BoosterParams } from './types';

/**
 * Default chucksize (unit: bytes)
 */
export const DefaultChuckSize = 1024 * 8;

/**
 * Default delay between retries (milliseconds)
 */
export const DefaultRetryDelay = 1000;

/**
 * Default retry attempts on fetch failures */
export const DefaultRetries = 3;

/**
 * Default log level - verbosity
 */
export const DefaultVerbosity = Verbosity.One;

/**
 * Default max concurrent chunks
 */
export const DefaultMaxConcurrentChunks = 4;

/**
 * Default request timeout (milliseconds)
 */
export const DefaultNetworkTimeout = 6000;

/**
 * Default retry backoff (milliseconds)
 */
export const DefaultRetryBackoffMultiplier = 1000;

export const DefaultBoosterParams: BoosterParams = {
  url: '',
  output: '',
  boost: false,
  concurrentChunks: DefaultMaxConcurrentChunks,
  chunkSize: DefaultChuckSize,
  maxChunks: -1,
  verbosity: Verbosity.One,
  force: false,
  fileSize: 0
};
