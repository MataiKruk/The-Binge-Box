import axios from "axios";
import Playlist from "../models/Playlist";

const baseUrl: string = import.meta.env.VITE_API_URL || "";
const playlistsEndpoint = 'playlists';
const fullUrl = `${baseUrl}/${playlistsEndpoint}/`;

const getAllPlaylists = async (): Promise<Playlist[]> => {
    const response = await axios.get<Playlist[]>(fullUrl);
    
    return response.data;
};

const updatePlaylist = (id: string, playlist: Playlist) => {
    return axios.put(fullUrl + id, playlist);
};

const addPlaylist = (playlist: Playlist) => {
    return axios.post(fullUrl, playlist);
};

const deletePlaylist = (id: string) => {
    return axios.delete(fullUrl + id);
};

export { getAllPlaylists, updatePlaylist, addPlaylist, deletePlaylist };