import { useContext, useState, useEffect } from 'react';
import './UserPlaylistList.css';
import Playlist from '../../models/Playlist';
import AuthContext from '../../context/AuthContext';
import { getPlaylistsByUser, addPlaylist, deletePlaylist } from '../../services/playlistAPI';
import PlaylistMovieUser from '../PlaylistMovieUser/PlaylistMovieUser';
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
            <button onClick={() => {setFormRevealed(true)}}>Add A Playlist</button>
            
            {formRevealed && (<form onSubmit={handleAddPlaylist}>
                <input 
                type='text'
                placeholder='Playlist Name'
                onChange={(e) => setNewPlaylistName(e.target.value)}
                />
                <button type='submit'>Add</button>
                <button onClick={() => {setFormRevealed(false)}}>Cancel</button>
            </form>
            )}

            <p>My Playlists:</p>
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