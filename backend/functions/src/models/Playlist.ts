import { ObjectId } from "mongodb"
import Movie from "./Movie"

export default interface Playlist {
    _id?: ObjectId,
    playlist_name: string,
    movies: Movie[]
}