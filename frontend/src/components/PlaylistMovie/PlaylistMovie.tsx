import Playlist from "../../models/Playlist";
import "./PlaylistMovie.css"

interface PlaylistMovieProps {
    playlist: Playlist;
    onUpdate: () => void;
}

function PlaylistMovie({playlist, onUpdate}: PlaylistMovieProps) {
    const posterUrl = "https://image.tmdb.org/t/p/w200"

    return (
      <>
        <li>
            <h2>{playlist.playlist_name}</h2>
            <ul>
                {playlist.movies.map((movie, index) => (
                    <li key={index}>
                        <p>Title: {movie.title}</p>
                        {movie.poster_path && (
                            <img src={posterUrl + movie.poster_path} alt={movie.title} />
                        )}
                    </li>
                ))}
            </ul>
        </li>
      </>
    )
  }
  
  export default PlaylistMovie;