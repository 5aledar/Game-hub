export interface Platform {
    id: number;
    name: string;
    slug: string;
}

export interface ParentPlatform {
    platform: Platform;
}

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: ParentPlatform[];
    released: string;
    rating: number;

}

export interface GameCardProps {
    game: Game;
}

export interface Genre {
    name: string;
    id: number;
    image_background: string;
}

export interface GameDetails {
    id: number;
    name: string;
    description_raw: string;
    metacritic: number;
    parent_platforms: ParentPlatform[];
    publishers: Publisher[];
    genres: Genre[];
    background_image: string;
    background_image_additional: string;
}
export interface Publisher {
    id: number;
    name: string;
}
export interface Trailer {
    id: number;
    preview: string;
    data: TrailerData; 
}

export interface TrailerData {
    '480'?: string;
    'max'?: string; 
}

