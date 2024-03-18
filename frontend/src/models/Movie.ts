export default interface Movie {
    title: string,
    original_title: string,
    overview: string,
    release_date: string,
    poster_path: string,
    genre_ids: number[]
}

//To do:
//convert genre_ids into actual genre names
//find out how to access posters using poster_path
//any other data we want?