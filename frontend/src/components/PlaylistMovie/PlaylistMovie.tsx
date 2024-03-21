import { NavLink } from "react-router-dom";
import Playlist from "../../models/Playlist";
import "./PlaylistMovie.css"
import { useState } from "react";

interface PlaylistMovieProps {
    playlist: Playlist;
}

function PlaylistMovie({playlist}: PlaylistMovieProps) {
    const posterUrl = "https://image.tmdb.org/t/p/w200"

    const [showFullOverview, setShowFullOverview] = useState<boolean>(false);

    // Function to toggle visibility of full overview
    const toggleOverview = () => {
      setShowFullOverview(!showFullOverview);
    };
  

    return (
      <>
         <li className="playlist-playlist-container">
                <h3>{playlist.playlist_name}</h3>
                <ul className="playlist-movie-container">
                    {playlist.movies.map((movie, index) => (
                        <li className="movie-container" key={index}>
                            <NavLink to={`/movie/${movie.id}`}>
                                {movie.poster_path && (
                                    <img src={posterUrl + movie.poster_path} alt={movie.title} />
                                )}
                            </NavLink>
                            <p className="movie-container-font">{movie.title}</p>
                            <div>
                            <p className="movie-overview">
                  {showFullOverview ? movie.overview : `${movie.overview.slice(0, 100)}...`}
                  {/* Render "Read More" button if overview is truncated */}
                  {!showFullOverview && movie.overview.length > 100 && (
                    <button className="read-more-less-button" onClick={toggleOverview}>Read More</button>
                  )}
                  {/* Render "Read Less" button if full overview is shown */}
                  {showFullOverview && (
                    <button className="read-more-less-button" onClick={toggleOverview}>Read Less</button>
                  )}
                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </li>
      </>
    )
  }
  
  export default PlaylistMovie;