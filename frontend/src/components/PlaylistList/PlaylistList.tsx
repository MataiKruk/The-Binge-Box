import Playlist from "../../models/Playlist";
import PlaylistMovie from "../PlaylistMovie/PlaylistMovie";
import "./PlaylistList.css"

interface PlaylistListProps {
    playlists: Playlist[];
}


function PlaylistList({playlists}: PlaylistListProps) {
    
    return (
      <>
      <ul className="playlist-container">
        {playlists.map((playlist) => (
            //in models, in playlist.ts .id is optional
            <PlaylistMovie key={playlist._id ? playlist._id.toString() : undefined} playlist={playlist}/>
        ))}
      </ul>
      </>
    )
  }
  
  export default PlaylistList