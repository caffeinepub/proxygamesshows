import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Show {
    title: string;
    thumbnailUrl: string;
    description: string;
    embedUrl: string;
}
export interface Game {
    title: string;
    thumbnailUrl: string;
    description: string;
    embedUrl: string;
}
export interface backendInterface {
    getAllGames(): Promise<Array<Game>>;
    getAllShows(): Promise<Array<Show>>;
}
