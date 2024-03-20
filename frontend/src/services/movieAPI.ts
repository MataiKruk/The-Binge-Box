import axios from "axios";
import Movie from "../models/Movie";

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = '42b418da90228e8d910f126d604c78fc';

interface ApiResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

const getPopularMovies = async (page: number = 1) : Promise<Movie[]> => {
    const response = await axios.get<ApiResponse>(`${baseUrl}/discover/movie`, {params: {
        api_key: apiKey,
        page: page
    }});
    
    return response.data.results;
};

const getMoviesBySearch = async (searchedString: string, page: number = 1): Promise<Movie[]> => {
    const response = await axios.get<ApiResponse>(`${baseUrl}/search/movie`, {params: {
        api_key: apiKey,
        query: searchedString,
        page: page
    }});
    
    return response.data.results;
};

const getMovieById = async (id: string) : Promise<Movie> => {
    const response = await axios.get<Movie>(`${baseUrl}/movie/${id}`,
    {params: {
        api_key: apiKey,
    }});
    
    return response.data;
}

//https://api.themoviedb.org/3/movie/693134?api_key=42b418da90228e8d910f126d604c78fc

export { getPopularMovies, getMoviesBySearch, getMovieById };