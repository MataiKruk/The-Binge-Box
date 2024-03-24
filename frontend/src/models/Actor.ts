import Movie from "./Movie"

export default interface Actor {
    id: string,
    name: string,
    known_for: Movie[]
}