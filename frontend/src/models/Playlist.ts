import { ObjectId } from "mongodb"
import { ShortMovie } from "./Movie"

export default interface Playlist {
    _id?: ObjectId,
    user?: string,
    playlist_name: string,
    movies: ShortMovie[]
}