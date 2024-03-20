import { useState, useEffect } from "react";
import Movie from "../../models/Movie";
import { getMoviesBySearch, getPopularMovies } from "../../services/movieAPI";
import { NavLink } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const [pageNumb, setPageNumb] = useState<number>(1);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const posterUrl = "https://image.tmdb.org/t/p/w200";

  useEffect(() => {
    if (isSearching) {
      getMoviesBySearch(searchQuery, pageNumb).then((response) => {
        setSearchedMovies(response);
      });
    } else {
      getPopularMovies(pageNumb).then((response) => {
        setPopularMovies(response);
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
    <div>
      <form onSubmit={handleSubmit}>
        <div className="searchBox">
          <input
            type="text"
            placeholder="Search for a Movie"
            value={searchQuery}
            name="search"
            onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
          <button type="submit">Submit</button>
        </div>
      </form>

      <div className="pageInfo">
        <button onClick={handlePrevPage} disabled={pageNumb < 2 ? true : false}>
          {"<"}
        </button>
        <p>Page: {pageNumb}</p>
        <button onClick={handleNextPage}>{">"}</button>
      </div>

      {!isSearching && (
        <div className="popularMoviesContainer">
          <h2>Popular Movies:</h2>
          <div className="movieCoversContainer">
            {popularMovies.map((movie) => (
              <div key={movie.id} className="popularMovie">
                <NavLink to={`/movie/${movie.id}`}>
                  <img src={movie.poster_path? posterUrl + movie.poster_path : "/src/images/poster-not-available.jpg"} />
                </NavLink>
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isSearching && (
        <div className="searchedMoviesContainer">
          <button
            onClick={() => {
              setIsSearching(false);
              setPageNumb(1);
            }}
          >
            Back to Browse
          </button>

          <h2>Search Results:</h2>
          <div className="movieCoversContainer">
            {searchedMovies.map((movie) => (
              <div key={movie.id} className="popularMovie">
                <NavLink to={`/movie/${movie.id}`}>
                  <img src={movie.poster_path? posterUrl + movie.poster_path : "/src/images/poster-not-available.jpg"} />
                </NavLink>
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;