/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { BoosterParams, Verbosity, PartialChuckData } from './types';
import { getChunk, getRange, splitChuckList } from './utils';
import { getFileDesc, writeToFile } from './flush';

/**
 * Downloads files
 * @param params params of type BoosterParams
 */
export const downloadChunks = (params: BoosterParams) => {
  const fd = getFileDesc(params.output, params.verbosity);
  if (!params.boost) {
    params.maxChunks = 1;
    params.chunkSize = params.fileSize;
  }
  const concurrentFetch = [] as Promise<void | PartialChuckData>[];
  const rangeList = getRange(params);
  rangeList.forEach(item => {
    concurrentFetch.push(getChunk(params.url, item.start, item.end, params.verbosity));
  });

  const fetchGroups = splitChuckList(concurrentFetch, params.concurrentChunks);
  if (params.verbosity > Verbosity.Two) {
    console.log(fetchGroups);
  }

  for (let i = 0, len = fetchGroups.length; i < len; i++) {
    Promise.all(fetchGroups[i])
      .then(resp => {
        resp.forEach(item => {
          writeToFile(fd, item as PartialChuckData, params.verbosity);
        });
      })
      .catch(function(err) {
        // all or none, each fetch has retries, if all fail, then we must bail.
        // as Promise.all() is ALL/OR/NONE
        console.log(err.message);
        return;
      });
  }
};
