import { NavLink } from "react-router-dom";
import Playlist from "../../models/Playlist";
import "./PlaylistMovieUser.css"
import { useState } from "react";

interface PlaylistMovieUserProps {
    playlist: Playlist;
    onDelete: (playlistId: string) => void;
}

function PlaylistMovieUser({playlist, onDelete}: PlaylistMovieUserProps) {
    const posterUrl = "https://image.tmdb.org/t/p/w200"

    const [showFullOverview, setShowFullOverview] = useState<boolean>(false);


    // Function to toggle visibility of full overview
    const toggleOverview = () => {
      setShowFullOverview(!showFullOverview);
    };

    if(playlist.user) {
      return (
      <>
         <li className="playlist-playlist-container">
         <h3>
          {/* NavLink the playlist routes! */}
          <NavLink to={`/playlists/${playlist._id}`} style={{ textDecoration: 'none', color: 'white'}}>
            {playlist.playlist_name}
          </NavLink>
        </h3>
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
                    <div>
                    <button className="glow-on-hover" onClick={() => onDelete(playlist._id ? playlist._id.toString() : 'default')}>Delete</button>
                </div>
                </ul>
            </li>
      </>
    )
    }
    
  }
  
  export default PlaylistMovieUser;