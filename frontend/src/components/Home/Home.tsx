import { useState, useEffect } from "react";
import Playlist from "../../models/Playlist";
import { getAllPlaylists } from "../../services/playlistAPI";
import PlaylistList from "../PlaylistList/PlaylistList";
import "./Home.css"

function Home() {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

  
    useEffect(() => {
      getAllPlaylists().then((playlists) => {
        setPlaylists(playlists);
      });
    }, []);

    return (
      <>
      <div className="binge-box-img"></div>
      <PlaylistList playlists={playlists} />
      </>
    )
  }
  
  export default Home