import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import Movie from "../../models/Movie";
import { ShortMovie } from "../../models/Movie";
import { getMovieById } from "../../services/movieAPI";
import { updatePlaylist, getPlaylistByID } from "../../services/playlistAPI";
import "./MovieDetails.css";
import StickyFooter from "../StickyFooter/StickyFooter";
import Playlist from "../../models/Playlist";

const MovieDetails = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const { id } = useParams<{ id: string }>();
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist>();
  const [newMovie, setNewMovie] = useState<ShortMovie>();
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const posterUrl = "https://image.tmdb.org/t/p/w500/";
  const defaultPlaylistID = "6601d1df0db423fb6474403c";

  useEffect(() => {
    if (id) {
      getMovieById(id).then((response) => {
        setMovie(response);
      });
    }
  }, [id]);

  useEffect(() => {
    getPlaylistByID(defaultPlaylistID).then((response) => {
      setCurrentPlaylist(response);
    });
  }, [defaultPlaylistID]);

  useEffect(() => {
    if (currentPlaylist && newMovie) {
      const updatedPlaylist: Playlist = {
        ...currentPlaylist,
        movies: [...(currentPlaylist.movies || []), newMovie],
      };
      updatePlaylist(currentPlaylist._id, updatedPlaylist);
    }
  }, [currentPlaylist, newMovie, defaultPlaylistID]);

  const handleAddMovie = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    //eventually this will target the specific user's playlist,
    //and even further beyond their specific playlist if they have multiple
    if (currentPlaylist && movie) {
      const currentNewMovie: ShortMovie = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
      };
      setNewMovie(currentNewMovie);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3500);
    }
  };

  const goBack = () => {
    history.back();
  }

  const genreNames = movie?.genres?.map((genre) => genre.name).join(", ");

  return (
    <>
      <div className="movieDetailsContainer">
        <div className="mainContainer">
          <div className="imgContainer">
            <img
              src={
                movie?.poster_path
                  ? posterUrl + movie?.poster_path
                  : "/src/images/poster-not-available.jpg"
              }
              alt={movie?.title}
            />
            <p className="img-container-p">{movie?.title}</p>
          </div>

          <div className="infoContainer">
            <h2 className="movie-details-h2">{movie?.original_title}</h2>
            <p className="movie-details-p">Genres: {genreNames}</p>
            <p className="movie-details-p">Runtime: {movie?.runtime}min</p>
            <p className="movie-details-p">
              Release Date: {movie?.release_date}
            </p>
          </div>
        </div>

        <div className="overviewContainer">
          <p> Description: {movie?.overview}</p>
        </div>

        <div className="btnContainer">
          <NavLink to="/search">
            <button className="btn--goback" onClick={goBack}>
              Go Back
            </button>
          </NavLink>
          <a href="#" className="btn btn--doar" onClick={handleAddMovie}>
            Add to my playlist
          </a>
        </div>
      </div>

      {showSuccess && (
        <div className="success-message-container">
          <div className="success-message">Movie added successfully!</div>
        </div>
        )}
      
      <StickyFooter />
    </>
  );
};

export default MovieDetails;
