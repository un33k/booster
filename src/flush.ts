/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { Verbosity, PartialChuckData, DataRange } from './types';
const fs = require('fs');

/**
 * Opens a file and returns the file descriptor
 * @param fileName name of output file
 * @param verbosity log level
 */
export const getFileDesc = (fileName: string, verbosity = Verbosity.One) => {
  const fd = fs.openSync(fileName, 'w+');
  if (verbosity > Verbosity.Two) {
    console.log(`File created (${fileName})`);
  }
  return fd;
};

/**
 * Given a partail data, it writes it to the output file at the given position
 * @param fd output file descriptor
 * @param chunck data info for chunck to be written to file
 * @param verbosity log level
 */
export const writeToFile = (
  fd: any,
  chunck: PartialChuckData,
  verbosity = Verbosity.One
) => {
  const offset = 0;
  const range = chunck.range;
  const position = range.start;
  const length: number = range.end - range.start + 1;

  fs.write(fd, chunck.data, offset, length, position, (err: NodeJS.ErrnoException) => {
    if (verbosity > Verbosity.Two) {
      console.log(`Wrote [${chunck.range.start}, ${chunck.range.end}] to file.`);
    }
  });
};

/**
 * Given a file name it returns true if file exsits, else false
 * @param fileName file name
 */
export const fileExists = (fileName): boolean => {
  const exists: boolean = fs.existsSync(fileName);
  return exists;
};
