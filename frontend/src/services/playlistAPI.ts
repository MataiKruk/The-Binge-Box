import axios from "axios";
import Playlist from "../models/Playlist";
import { ObjectId } from "mongodb";

const baseUrl: string = import.meta.env.VITE_API_URL || "";
const playlistsEndpoint = 'playlists';
const fullUrl = `${baseUrl}/${playlistsEndpoint}`;
const apiUrl = "https://us-central1-the-binge-box.cloudfunctions.net/api/playlists";

const getAllPlaylists = async (): Promise<Playlist[]> => {
    const response = await axios.get<Playlist[]>(apiUrl);

    return response.data;
};

const getPlaylistByID = async (id: string): Promise<Playlist> => {
    const response = await axios.get<Playlist>(`${apiUrl}/${id}`);

    return response.data;
};

const updatePlaylist = (id: ObjectId, playlist: Playlist) => {
    return axios.put(`${fullUrl}/${id}`, playlist);
};

const addPlaylist = (playlist: Playlist) => {
    return axios.post(fullUrl, playlist);
};

const deletePlaylist = (id: string) => {
    return axios.delete(`${fullUrl}/${id}`);
};

const getMataiPlaylist = async (id: string) => {
    const mataiData = await axios.get<Playlist>(`${fullUrl}/${id}`);
    return mataiData.data;
};

const getMohammadPlaylist = async (id: string) => {
    const mohammadData = await axios.get<Playlist>(`${fullUrl}/${id}`);
    return mohammadData.data;
};

const getAyeshaPlaylist = async (id: string) : Promise<Playlist> => {
    const ayeshaData = await axios.get<Playlist>(`${fullUrl}/${id}`);
    return ayeshaData.data;
};

const getPlaylistsByUser = async (user: string) : Promise<Playlist[]> => {
    const response = await axios.get<Playlist[]>(`${fullUrl}/user/${user}`);
    return response.data;
};

export { getAllPlaylists, updatePlaylist, addPlaylist, deletePlaylist, getMataiPlaylist, getMohammadPlaylist, getAyeshaPlaylist, getPlaylistByID, getPlaylistsByUser };