import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import Movie from "../../models/Movie";
import { getMovieById } from "../../services/movieAPI";
import "./MovieDetails.css";
import StickyFooter from "../StickyFooter/StickyFooter";

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

  const goBack = () => {
    history.back();
  }

  const genreNames = movie?.genres?.map((genre) => genre.name).join(", ");

  return (
    <>
      <div className="movieDetailsContainer">
        <div className="mainContainer">
          <div className="imgContainer">
            <img src={movie?.poster_path ? posterUrl + movie?.poster_path : "/src/images/poster-not-available.jpg"} alt={movie?.title} />
            <p className="img-container-p">{movie?.title}</p>
          </div>

          <div className="infoContainer">
            <h2 className="movie-details-h2">{movie?.original_title}</h2>
            <p className="movie-details-p">Genres: {genreNames}</p>
            <p className="movie-details-p">Runtime: {movie?.runtime}min</p>
            <p className="movie-details-p">Release Date: {movie?.release_date}</p>
          </div>
        </div>

        <div className="overviewContainer">
          <p> Description: {movie?.overview}</p>
        </div>

        <div className="btnContainer">
          <NavLink to="/search">
            <button className="btn--goback" onClick={() => window.history.back()}>Go Back</button>
          </NavLink>
          <a href="#" className="btn btn--doar">Add to my playlist</a>
        </div>
      </div>
      <StickyFooter />
    </>
  );
};

export default MovieDetails;