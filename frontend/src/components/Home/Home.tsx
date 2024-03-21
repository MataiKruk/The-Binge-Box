import { useState, useEffect } from "react";
import Playlist from "../../models/Playlist";
import { getAllPlaylists } from "../../services/playlistAPI";
import PlaylistList from "../PlaylistList/PlaylistList";

function Home() {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    const getPreMadePlaylists = () => {
      getAllPlaylists().then((playlists) => {
        setPlaylists(playlists);
      });
    }
  
    useEffect(() => {
      getAllPlaylists().then((playlists) => {
        setPlaylists(playlists);
      });
    }, []);

    return (
      <>
      <h1>Home</h1>
      <PlaylistList playlists={playlists} onUpdate={getPreMadePlaylists} />
      </>
    )
  }
  
  export default Home