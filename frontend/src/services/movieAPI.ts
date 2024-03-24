import axios from "axios";
import Movie from "../models/Movie";
import Actor from "../models/Actor";

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = '42b418da90228e8d910f126d604c78fc';

interface ApiResponse {
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number
}

interface ActorResponse {
    page: number,
    results: Actor[],
    total_pages: number,
    total_results: number
}

export interface Filters {
    with_cast?: number | string,
    with_genres?: string,
    'primary_release_date.gte'?: string,
    'primary_release_date.lte'?: string,
    sort_by?: string
}

const getPopularMovies = async (page: number = 1) : Promise<Movie[]> => {
    const response = await axios.get<ApiResponse>(`${baseUrl}/discover/movie`, {params: {
        api_key: apiKey,
        page: page,
        include_adult: false
    }});
    
    return response.data.results;
};

const getMoviesBySearch = async (searchedString: string, page: number = 1): Promise<Movie[]> => {
    const response = await axios.get<ApiResponse>(`${baseUrl}/search/movie`, {params: {
        api_key: apiKey,
        query: searchedString,
        include_adult: false,
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

const getMoviesByFilters = async (filters : Filters, page: number) : Promise<Movie[]> => {
    const response = await axios.get<ApiResponse>(`${baseUrl}/discover/movie`,
    {params: {
        api_key: apiKey,
        page: page,
        include_adult: false,
        ...filters
    }});
    
    return response.data.results;
}

const getActorByName = async (name : string) : Promise<Actor[]> => {
    const response = await axios.get<ActorResponse>(`${baseUrl}/search/person`,
    {params: {
        api_key: apiKey,
        query: name
    }});
    
    return response.data.results;
}
//https://api.themoviedb.org/3/movie/693134?api_key=42b418da90228e8d910f126d604c78fc

export { getPopularMovies, getMoviesBySearch, getMovieById, getMoviesByFilters, getActorByName };