export interface Trailer {
    id: number;
    preview: string;
    data: TrailerData; 
}

export interface TrailerData {
    '480'?: string;
    'max'?: string; 
}