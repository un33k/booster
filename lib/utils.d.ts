import { Verbosity, DataRange, BoosterParams, PartialChuckData } from './types';
export declare const getContentLength: (url: string, verbosity?: Verbosity) => Promise<any>;
export declare const getChunk: (url: string, start: number, end: number, verbosity?: Verbosity) => Promise<void | PartialChuckData>;
export declare const getMaxChunks: (params: BoosterParams) => number;
export declare const getRange: (params: BoosterParams) => DataRange[];
export declare const splitChuckList: (list: any[], size: number) => any[];
