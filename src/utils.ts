/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { get } from 'lodash';
import { Verbosity, DataRange, BoosterParams, PartialChuckData } from './types';
import requests from './request';
import { AxiosResponse } from 'axios';

/**
 * Returns remote file's content length or throws exception
 * @param url link to remote file
 * @param verbosity verbosity log level
 */
export const getContentLength = (url: string, verbosity = Verbosity.One) => {
  return requests
    .head(url)
    .then(resp => {
      if (verbosity > Verbosity.Two) {
        console.log('Header', resp.headers);
      }
      if (resp.status === 200) {
        return get(resp, 'headers.content-length', undefined);
      } else {
        console.log(`Failed to fetch file length (${resp.statusText})`);
        return undefined;
      }
    })
    .catch(err => {
      console.log('Error while fetching:', err.message);
    });
};

/**
 *
 * @param url link to remote file
 * @param start starting byte of chunck to be fetched
 * @param end ending byte of chunk to be fetched
 */
export const getChunk = (
  url: string,
  start: number,
  end: number,
  verbosity = Verbosity.One
): Promise<void | PartialChuckData> => {
  return requests
    .request({
      url,
      method: 'get',
      headers: { Range: `bytes=${start}-${end}` },
      responseType: 'arraybuffer'
    })
    .then(resp => {
      if (verbosity > Verbosity.Two) {
        console.log(`Fetching chunk range: [${start}, ${end}]`);
      }
      return { data: (resp as AxiosResponse<any>).data, range: { start, end } };
    })
    .catch(err => {
      console.log('Error while fetching:', err.message);
    });
};

/**
 * Returns the total downloadable chunks as per params
 * @param params params of type BoosterParams
 */
export const getMaxChunks = (params: BoosterParams): number => {
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

/**
 * Returns a list of ranges
 * @param params params of type BoosterParams
 */
export const getRange = (params: BoosterParams): DataRange[] => {
  const rangeList = [] as DataRange[];
  let idx = 0;
  let start = 0;
  let end = params.chunkSize;
  while (idx < params.maxChunks) {
    if (idx === 0) {
      end = start + params.chunkSize - 1;
    } else {
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
  if (params.verbosity > Verbosity.Two) {
    console.log(rangeList);
  }
  return rangeList;
};

/**
 * Given a single list, it will divide the list into many small size
 * @param list array of any type
 * @param size size of each chunk
 */
export const splitChuckList = (list: any[], size: number): any[] => {
  return list.reduce(function(r, a, i) {
    var p = Math.floor(i / size);
    r[p] = r[p] || [];
    r[p].push(a);
    return r;
  }, []);
};
