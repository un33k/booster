import { LogLevel } from './boostware.types';
export declare const checkStatus: (resp: Response) => Response;
export declare const getContentLength: (url: string, logLevel?: LogLevel) => Promise<any>;
export declare const getChunk: (url: string, start: number, end: number, logLevel?: LogLevel) => Promise<string | void>;
