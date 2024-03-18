import axios from "axios";
import Movie from "../models/Movie";

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = '42b418da90228e8d910f126d604c78fc';
let currentPage = 1;

const getPopularMovies = async (): Promise<Movie[]> => {
    const response = await axios.get<Movie[]>(`${baseUrl}/discover/movie?api_key=${apiKey}&page=${currentPage}`);
    
    return response.data;
};

export { getPopularMovies };