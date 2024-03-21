import { useState, useEffect } from "react";
import Playlist from "../../models/Playlist";
import { getAllPlaylists } from "../../services/playlistAPI";
import PlaylistList from "../PlaylistList/PlaylistList";
import "./Home.css"
import StickyFooter from "../StickyFooter/StickyFooter";

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
      <StickyFooter></StickyFooter>
      </>
    )
  }
  
  export default Home