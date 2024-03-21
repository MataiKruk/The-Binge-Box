import Playlist from "../../models/Playlist";
import "./PlaylistMovie.css"

interface PlaylistMovieProps {
    playlist: Playlist;
}

function PlaylistMovie({playlist}: PlaylistMovieProps) {
    const posterUrl = "https://image.tmdb.org/t/p/w200"

    return (
      <>
        <li className="playlist-playlist-container">
            <h2>{playlist.playlist_name}</h2>
            <ul className="playlist-movie-container">
                {playlist.movies.map((movie, index) => (
                    <li className="movie-container" key={index}>
                        {movie.poster_path && (
                            <img src={posterUrl + movie.poster_path} alt={movie.title} />
                        )}
                        <p className="movie-container-font">{movie.title}</p>
                    </li>
                ))}
            </ul>
        </li>
      </>
    )
  }
  
  export default PlaylistMovie;