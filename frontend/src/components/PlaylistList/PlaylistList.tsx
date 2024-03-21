import Playlist from "../../models/Playlist";
import PlaylistMovie from "../PlaylistMovie/PlaylistMovie";

interface PlaylistListProps {
    playlists: Playlist[];
    onUpdate: () => void;
}


function PlaylistList({playlists, onUpdate}: PlaylistListProps) {
    
    return (
      <>
      <h1>PlaylistList</h1>
      <ul>
        {playlists.map((playlist) => (
            //in models, in playlist.ts .id is optional
            <PlaylistMovie key={playlist._id ? playlist._id.toString() : undefined} playlist={playlist} onUpdate={onUpdate}/>
        ))}
      </ul>
      </>
    )
  }
  
  export default PlaylistList