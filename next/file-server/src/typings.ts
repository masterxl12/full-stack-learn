export const DEFAULT_SIZE = 1024 * 1024 * 60

export interface Part {
    chunk: Blob
    size: number
    filename?: string
    chunk_name?: string
    loaded?: number
    percent?: number
}