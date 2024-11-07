export interface Platform {
    id: number;
    name: string;
    slug: string;
}

export interface ParentPlatform {
    platform: Platform;
}