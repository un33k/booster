import { Verbosity, PartialChuckData } from './types';
export declare const getFileDesc: (fileName: string, verbosity?: Verbosity) => any;
export declare const writeToFile: (fd: any, chunck: PartialChuckData, verbosity?: Verbosity) => void;
export declare const fileExists: (fileName: any) => boolean;
