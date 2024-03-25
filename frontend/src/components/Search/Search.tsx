import { useState, useEffect } from "react";
import Movie from "../../models/Movie";
import { getMoviesBySearch, getPopularMovies } from "../../services/movieAPI";
import { NavLink } from "react-router-dom";
import "./Search.css";
import StickyFooter from "../StickyFooter/StickyFooter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
  const [pageNumb, setPageNumb] = useState<number>(1);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [moviesReturned, setMoviesReturned] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const posterUrl = "https://image.tmdb.org/t/p/w200";

  useEffect(() => {
    if (isSearching) {
      getMoviesBySearch(searchQuery, pageNumb).then((response) => {
        setSearchedMovies(response);
        setMoviesReturned(response.length > 0);
      });
    } else {
      getPopularMovies(pageNumb).then((response) => {
        setPopularMovies(response);
        setMoviesReturned(response.length > 0);
      });
    }
  }, [pageNumb, isSearching]);

  const handleNextPage = () => {
    setPageNumb(pageNumb + 1);
  };

  const handlePrevPage = () => {
    if (pageNumb > 1) {
      setPageNumb(pageNumb - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPageNumb(1);
    let searchValue = e.currentTarget["search"].value;
    setSearchQuery(searchValue);
    const searchedMoviesResult = await getMoviesBySearch(searchQuery, pageNumb);
    setSearchedMovies(searchedMoviesResult);
    setIsSearching(true);
    searchValue = "";
  };

  return (
    <>
    <div className="search-body">
    <div className="binge-box-search-img"></div>
      <form onSubmit={handleSubmit}>
        <div className="searchBox">
          <input
            type="text"
            placeholder="Search for a Movie"
            value={searchQuery}
            name="search"
            onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
          <button className="glow-on-hover" type="submit">Submit</button>
        </div>
      </form>

      <h2 className="popular-movies-title">Popular Movies:</h2>
      <div className="pageInfo">
        <button className="arrow-icon" onClick={handlePrevPage} disabled={pageNumb < 2 ? true : false}>
        <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <p className="page-number">Page: {pageNumb}</p>
        <button className="arrow-icon" onClick={handleNextPage} disabled={!moviesReturned}>
        <FontAwesomeIcon icon={faArrowRight} className="arrow-icon"/>
        </button>
      </div>

      {!isSearching && (
        <div className="popularMoviesContainer">
          <div className="movieCoversContainer">
            {popularMovies.map((movie) => (
              <div key={movie.id} className="popularMovie">
                <NavLink to={`/movie/${movie.id}`}>
                  <img
                    src={
                      movie.poster_path
                        ? posterUrl + movie.poster_path
                        : "/src/images/poster-not-available.jpg"
                    }
                  />
                </NavLink>
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isSearching && (
        <div className="searchedMoviesContainer">
          <button className="glow-on-hover"
            onClick={() => {
              setIsSearching(false);
              setPageNumb(1);
            }}
          >
            Back to Browse
          </button>

          <h2 className="popular-movies-title-search-results">Search Results:</h2>
          <div className="movieCoversContainer">
            {searchedMovies.map((movie) => (
              <div key={movie.id} className="popularMovie">
                <NavLink to={`/movie/${movie.id}`}>
                  <img
                    src={
                      movie.poster_path
                        ? posterUrl + movie.poster_path
                        : "/src/images/poster-not-available.jpg"
                    }
                  />
                </NavLink>
                <p>{movie.title}</p>
              </div>
            ))}
            {!moviesReturned && <p>End of results</p>}
          </div>
        </div>
      )}
    </div>
    <StickyFooter></StickyFooter>
    </>
  );
};

export default Search;
