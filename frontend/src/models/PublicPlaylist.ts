import { ObjectId } from "mongodb"
import Movie from "./Movie"

export default interface PublicPlaylist {
    _id?: ObjectId,
    playlist_name: string,
    movies: Movie[]
}