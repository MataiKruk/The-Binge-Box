import Playlist from "../../models/Playlist";

interface PlaylistListProps {
    playlists: Playlist[];
    onUpdate: () => void;
}


function PlaylistList() {
    
    return (
      <>
      <h1>PlaylistList</h1>
      </>
    )
  }
  
  export default PlaylistList