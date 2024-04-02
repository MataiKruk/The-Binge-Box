import { useEffect, useState } from "react";
import Movie from "../../models/Movie";
import { getPopularMovies } from "../../services/movieAPI";
import { NavLink } from "react-router-dom";
import "./MovieRandomizer.css";

function MovieRandomizer() {
    const [randomMovie, setRandomMovie] = useState<Movie | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [page, setPage] = useState<number>();
    const posterUrl = "https://image.tmdb.org/t/p/w200";

    useEffect(() => {
        setPage(Math.floor((Math.random() * 500) + 1))
      }, [modalOpen]);

    const handleRandomize = () => {
        getPopularMovies(page).then((response) => {
            if (response.length > 0) {
                const randomIndex = Math.floor(Math.random() * response.length);
                setRandomMovie(response[randomIndex]); // Set a random movie
                setModalOpen(true); // Open the modal
            }
        });
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <button onClick={handleRandomize}>Click Here For a Random Movie!!</button>
            {modalOpen && randomMovie && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-content-title">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2 className="movie-randomizer-h2">{randomMovie.title}</h2></div>
                        <div className="modal-content-img-p">
                        <div className="modal-content-img">
                        <NavLink to={`/movie/${randomMovie.id}`}>
                            <img
                                src={randomMovie.poster_path ? posterUrl + randomMovie.poster_path : "/src/images/poster-not-available.jpg"}
                                alt={randomMovie.title}
                            />
                        </NavLink>
                        </div>
                        <div className="modal-content-p">
                        <p className="modal-content-p">{randomMovie.overview}</p>
                        </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieRandomizer;