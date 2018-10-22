export declare enum Verbosity {
    One = 1,
    Two = 2,
    Three = 3
}
export interface BoosterParams {
    url: string;
    output: string;
    boost: boolean;
    concurrentChunks: number;
    chunkSize: number;
    maxChunks: number;
    verbosity: Verbosity;
    force: boolean;
    fileSize: number;
}
export interface DataRange {
    start: number;
    end: number;
}
export interface PartialChuckData {
    data: any;
    range: DataRange;
}
