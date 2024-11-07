import { ParentPlatform } from "./platform.model";
import { Genre } from "./genre.model";
import { Publisher } from "./publisher.model";
export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: ParentPlatform[];
    released: string;
    rating: number;

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