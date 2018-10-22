export declare enum LogLevel {
    One = 1,
    Two = 2,
    Three = 3
}
export interface BoosterParams {
    url: string | undefined | null;
    output?: string;
    concurrent?: boolean;
    concurrnetChunks?: number;
    chunkSize?: number;
    logLevel?: LogLevel;
}
export interface DataRange {
    start: number;
    end: number;
}
export interface PartialChuckData {
    data: any;
    range: DataRange;
}
