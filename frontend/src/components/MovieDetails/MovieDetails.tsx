import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Movie from "../../models/Movie";
import { getMovieById } from "../../services/movieAPI";
import "./MovieDetails.css";
import { NavLink } from "react-router-dom";

const MovieDetails = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const { id } = useParams<{ id: string }>();
  const posterUrl = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    if (id) {
      getMovieById(id).then((response) => {
        console.log(`genres: ${movie?.genre_ids}`);
        setMovie(response);
      });
    }
  }, []);

  const genreNames = movie?.genres?.map((genre) => genre.name).join(", ");

  return (
    <div className="movieDetailsContainer">
      <div className="mainContainer">
        <div className="imgContainer">
          <img src={movie?.poster_path? posterUrl + movie?.poster_path : "/src/images/poster-not-available.jpg"} />
          <p>{movie?.title}</p>
        </div>

        <div className="infoContainer">
          <p>Original Title: {movie?.original_title}</p>
          <p>Genres: {genreNames}</p>
          <p>Runtime: {movie?.runtime}min</p>
          <p>Release Date: {movie?.release_date}</p>
        </div>
      </div>

      <div className="overviewContainer">
        <p>Overview: {movie?.overview}</p>
      </div>

      <div className="btnContainer">
        <NavLink to="/search">
        <button onClick={() => window.history.back()}>Go Back</button>
        </NavLink>
        <button>Add to my playlist</button>
      </div>
    </div>
  );
};

export default MovieDetails;
