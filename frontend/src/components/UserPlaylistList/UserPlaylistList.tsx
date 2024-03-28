import { useContext, useState, useEffect } from 'react';
import './UserPlaylistList.css';
import Playlist from '../../models/Playlist';
import AuthContext from '../../context/AuthContext';
import { getPlaylistsByUser, addPlaylist, deletePlaylist } from '../../services/playlistAPI';
import PlaylistMovieUser from '../PlaylistMovieUser/PlaylistMovieUser';
import MovieRandomizer from '../MovieRandomizer/MovieRandomizer';
const UserPlaylistList = () => {

    const [currentPlaylists, setCurrentPlaylists] = useState<Playlist[]>([]);
    const [formRevealed, setFormRevealed] = useState<boolean>(false);
    const [newPlaylistName, setNewPlaylistName] = useState<string>('');
    const { user } = useContext(AuthContext);
    const [currentUserID, setCurrentUserID] = useState<string>()

    useEffect(() => {
        if(currentUserID) {
        getPlaylistsByUser(currentUserID).then((response) => {
          setCurrentPlaylists(response);
        });
      }}, [currentUserID]);

      useEffect(() => {
        if(user?.uid) {
          setCurrentUserID(user.uid);  
        }
      }, [user?.uid, currentPlaylists]);

    const handleAddPlaylist = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newPlaylist : Playlist = {
            user: currentUserID,
            playlist_name: newPlaylistName,
            movies: []
        }

        setFormRevealed(false);
        await addPlaylist(newPlaylist);
        setCurrentPlaylists([...currentPlaylists, newPlaylist]);
        if(currentUserID) {
          getPlaylistsByUser(currentUserID).then((response) => {
            setCurrentPlaylists(response);
          })
          
        }
    }

    const handleDeletePlaylist = async (playlistId: string) => {
      if(playlistId !== 'default') {
        setCurrentPlaylists(currentPlaylists.filter(playlist => playlist._id?.toString() !== playlistId));
        await deletePlaylist(playlistId)
      }
    };

    return (
        <div>
            <h2 className='user-playlist-list-h2'>Welcome. What would you like to do?</h2>
            <div className='user-playlist-list-button-movie-randomizer'>
            <div className="user-playlist-list-button-div">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="playlist"><defs><linearGradient id="a" x1="12" x2="12" y1="22" y2="2" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#82f4b1"></stop><stop offset="1" stop-color="#30c67c"></stop></linearGradient></defs><path fill="url(#a)" d="m8.05 12-1 .62v-1.24ZM22 5v14a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3Zm-3 12a1 1 0 0 0-1-1H6a1 1 0 0 0 0 2h12a1 1 0 0 0 1-1ZM5.53 15.27a1.05 1.05 0 0 0 .47.13.92.92 0 0 0 .51-.15l4-2.39a1 1 0 0 0 0-1.72l-4-2.39a1 1 0 0 0-1 0A1 1 0 0 0 5 9.6v4.8a1 1 0 0 0 .53.87ZM13 13h5a1 1 0 0 0 0-2h-5a1 1 0 1 0 0 2Zm6-6a1 1 0 0 0-1-1H6a1 1 0 0 0 0 2h12a1 1 0 0 0 1-1Z"></path></svg>
            <button onClick={() => {setFormRevealed(true)}}>Add a Playlist</button>
            {formRevealed && (<form className="form-user-playlist-list" onSubmit={handleAddPlaylist}>
                <input 
                className="playlist-form-input-user-playlist-list" type='text'
                placeholder='Playlist Name'
                onChange={(e) => setNewPlaylistName(e.target.value)}
                />
                <div className='add-cancel-button-user-playlist-list'>
                <button className="add-button-user-playlist-list" type='submit'>Add</button>
                <button className="cancel-button-user-playlist-list" onClick={() => {setFormRevealed(false)}}>Cancel</button>
                </div>
            </form>
            )}
            </div>
            <div className="user-playlist-list-movie-randomizer">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" id="shuffle"><defs><linearGradient id="a" x1="7.17" x2="24.83" y1="31.295" y2=".705" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4c46c8"></stop><stop offset="1" stop-color="#87bfff"></stop></linearGradient></defs><path fill="url(#a)" d="M26 2H6a4 4 0 0 0-4 4v20a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4Zm-8.687 12.087L16.166 16l1.147 1.914a4.327 4.327 0 0 0 3.244 2.057l-.264-.264a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1 0 1.414l-2 2a1 1 0 0 1-1.414-1.414l.319-.319a6.321 6.321 0 0 1-5.012-3.032l-.6-1-.6 1A6.33 6.33 0 0 1 9 22a1 1 0 0 1 0-2 4.324 4.324 0 0 0 3.687-2.087L13.834 16l-1.147-1.914A4.325 4.325 0 0 0 9 12a1 1 0 0 1 0-2 6.33 6.33 0 0 1 5.4 3.058l.6 1 .6-1a6.324 6.324 0 0 1 5.013-3.032l-.319-.319a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1 0 1.414l-2 2a1 1 0 0 1-1.414-1.414l.264-.264a4.325 4.325 0 0 0-3.245 2.058Z" data-name="Layer 2"></path></svg>
            <MovieRandomizer></MovieRandomizer>
            </div>
            </div>
            

            <h2 className='user-playlist-list-h2'>My Playlists</h2>
            <ul className="playlist-container">
        {currentPlaylists.map((playlist) => (
            <PlaylistMovieUser 
            key={playlist._id ? playlist._id.toString() : 'default'} 
            playlist={playlist}
            onDelete={handleDeletePlaylist}/>
        ))}
      </ul>
        </div>
    )
}

export default UserPlaylistList;