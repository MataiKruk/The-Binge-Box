import { useState, useEffect, useContext } from "react";
import { useParams, NavLink } from "react-router-dom";
import Movie from "../../models/Movie";
import { ShortMovie } from "../../models/Movie";
import { getMovieById } from "../../services/movieAPI";
import {
  updatePlaylist,
  getPlaylistByID,
  getPlaylistsByUser,
} from "../../services/playlistAPI";
import "./MovieDetails.css";
import StickyFooter from "../StickyFooter/StickyFooter";
import Playlist from "../../models/Playlist";
import AuthContext from "../../context/AuthContext";
import { ObjectId } from "mongodb";

const MovieDetails = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const { id } = useParams<{ id: string }>();
  const [currentPlaylists, setCurrentPlaylists] = useState<Playlist[]>([]);
  const [newMovie, setNewMovie] = useState<ShortMovie>();
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const posterUrl = "https://image.tmdb.org/t/p/w500/";
  const [currentUserID, setCurrentUserID] = useState<string>("");
  const { user } = useContext(AuthContext);
  const [selectedPlaylistID, setSelectedPlaylistID] = useState<ObjectId>();
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist>();

  useEffect(() => {
    if (id) {
      getMovieById(id).then((response) => {
        setMovie(response);
      });
    }
  }, [id]);

  useEffect(() => {
    if (selectedPlaylistID) {
      getPlaylistByID(selectedPlaylistID.toString()).then((response) => {
        setSelectedPlaylist(response);
      });
    }
  }, [selectedPlaylistID]);

  useEffect(() => {
    if (selectedPlaylist && newMovie) {
      const updatedPlaylist: Playlist = {
        ...selectedPlaylist,
        movies: [...(selectedPlaylist.movies || []), newMovie],
      };

      if (selectedPlaylist._id) {
        updatePlaylist(selectedPlaylist._id, updatedPlaylist);
      }
    }
  }, [selectedPlaylist, newMovie]);

  useEffect(() => {
    if (currentUserID) {
      getPlaylistsByUser(currentUserID).then((response) => {
        setCurrentPlaylists(response);
      });
    }
  }, [currentUserID]);

  useEffect(() => {
    if (user?.uid) {
      setCurrentUserID(user.uid);
    }
  }, [user?.uid]);

  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedPlaylist && movie) {
      const currentNewMovie: ShortMovie = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
      };

      setNewMovie(currentNewMovie);

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3500);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3500);
    }
  };

  const handlePlaylistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlaylistIDStr: ObjectId = e.target
      .value as unknown as ObjectId;
    setSelectedPlaylistID(selectedPlaylistIDStr);
  };

  const goBack = () => {
    history.back();
  };

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

          <form onSubmit={handleAddMovie}>
            <select onChange={handlePlaylistChange}>
              <option value={""}></option>
              {currentPlaylists.map((playlist, index) => (
                <option key={index} value={String(playlist._id)}>
                  {playlist.playlist_name}
                </option>
              ))}
            </select>
            <button className="btn btn--doar" type="submit">
              Add To Playlist
            </button>
          </form>
        </div>
      </div>
      {showSuccess && (
        <div className="success-message-container">
          <div className="success-message">Movie added successfully!</div>
        </div>
      )}

      {showError && (
        <div className="error-message-container">
          <div className="error-message">Error: Please Select a Playlist.</div>
        </div>
      )}

      <StickyFooter />
    </>
  );
};

export default MovieDetails;
