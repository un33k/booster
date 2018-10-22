/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import axios from 'axios';
import { DefaultNetworkTimeout, DefaultRetryBackoffMultiplier } from './defaults';
const axiosRetry = require('axios-retry');

const requests = axios.create({ timeout: DefaultNetworkTimeout });

/**
 * Intercept response and automatically retry
 */
axiosRetry(requests, {
  retries: 3,
  retryDelay: (retryCount: number): number => {
    return retryCount * DefaultRetryBackoffMultiplier;
  }
});

export default requests;
