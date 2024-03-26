import StickyFooter from "../StickyFooter/StickyFooter";
import { useState, useEffect } from "react";
import Movie from "../../models/Movie";
import Actor from "../../models/Actor";
import { getMoviesByFilters, getActorByName, Filters } from "../../services/movieAPI";
import { NavLink } from "react-router-dom";
import "./AdvancedSearch.css";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdvancedSearch = () => {
  const [pageNumb, setPageNumb] = useState<number>(1);
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [searchedActor, setSearchedActor] = useState<Actor[]>([]);
  const [searchedActorName, setSearchedActorName] = useState<string>('');
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [releaseDateAfter, setReleaseDateAfter] = useState<string>('1800-01-01');
  const [releaseDateBefore, setReleaseDateBefore] = useState<string>('2050-01-01');
  const [sortBy, setSortBy] = useState<string>('title.asc')
  const [moviesReturned, setMoviesReturned] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const posterUrl = "https://image.tmdb.org/t/p/w200";

  const genres = [
    {id: 28, name: "Action"},
    {id: 12, name: "Adventure"},
    {id: 16, name: "Animation"},
    {id: 35, name: "Comedy"},
    {id: 80, name: "Crime"},
    {id: 99, name: "Documentary"},
    {id: 18, name: "Drama"},
    {id: 10751, name: "Family"},
    {id: 14, name: "Fantasy"},
    {id: 36, name: "History"},
    {id: 27, name: "Horror"},
    {id: 10402, name: "Music"},
    {id: 9648, name: "Mystery"},
    {id: 10749, name: "Romance"},
    {id: 878, name: "Science Fiction"},
    {id: 53, name: "Thriller"},
    {id: 10752, name: "War"},
    {id: 37, name: "Western"}
  ]

  const sortByOptions = [
    {id: "title.asc", name: "Title - A-Z"},
    {id: "title.desc", name: "Title - Z-A"},
    {id: "primary_release_date.asc", name: "Release Date - Ascending"},
    {id: "primary_release_date.desc", name: "Release Date - Descending"},
    {id: "primary_release_date.asc", name: "Release Date - Ascending"},
    {id: "popularity.asc", name: "Popularity - Ascending"},
    {id: "popularity.desc", name: "Popularity - Descending"}
  ]

  useEffect(() => {
    getMoviesByFilters(filters, pageNumb).then((response) => {
      setSearchedMovies(response);
    });
  }, [pageNumb, filters]);

  useEffect(() => {
    if(searchedActorName != '') {
      getActorByName(searchedActorName).then((response) => {
        setSearchedActor(response)
      })
    }
  }, [searchedActorName]);

  useEffect(() => {
    if (searchedMovies.length > 0) {
      setMoviesReturned(true);
    } else {
      setMoviesReturned(false);
    }
  }, [searchedMovies]);

  const handleNextPage = () => {
    setPageNumb(pageNumb + 1);
  };

  const handlePrevPage = () => {
    if (pageNumb > 1) {
      setPageNumb(pageNumb - 1);
    }
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const genreId = parseInt(e.target.value, 10);
    setSelectedGenres(prevSelectedGenres => {
      if (e.target.checked) {
        return [...prevSelectedGenres, genreId];
      } else {
        return prevSelectedGenres.filter(id => id !== genreId);
      }
      
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearching(true);
    setPageNumb(1);

    const newFilters = {
      with_cast: undefined as string | undefined,
      with_genres: selectedGenres.join(','),
      'primary_release_date.lte': releaseDateBefore,
      'primary_release_date.gte': releaseDateAfter,
      sort_by: sortBy
    };

    if (searchedActorName) {
      const actor = searchedActor[0];
      if (actor) {
        newFilters['with_cast'] = actor.id;
      }
    }

    setFilters(newFilters);

    const advancedSearchResults = await getMoviesByFilters(filters, pageNumb);
    setSearchedMovies(advancedSearchResults);
  };

  return (
    <div className="advanced-search-body">
      <div className="advanced-search-form-container">
        <form onSubmit={handleSubmit} className="advanced-search-form">
          <div className="actor-search-box">
          <label className="input-label">Search By Actor: </label>
          <input className="input-style"
          type="text"
          placeholder="Default: any actor"
          value={searchedActorName}
          onChange={(e) => setSearchedActorName(e.target.value)}
          ></input>
          </div>
          <div className="release-dates-container">
            <div className="release-date-after">
              <label className="input-label">Released After: </label>
              <input className="input-style"
              type="date"
              onChange={(e) => setReleaseDateAfter(e.target.value)}
              ></input>
            </div>
            <div className="release-date-before">
              <label className="input-label">Released Before: </label>
              <input className="input-style"
              type="date"
              onChange={(e) => setReleaseDateBefore(e.target.value)}
              >  
              </input>
            </div>
          </div>
          <label className="input-label">Sort By: </label>
          <select className="input-style"

          onChange={(e) => setSortBy(e.target.value)}
          >
            {sortByOptions.map((option, index) => (
            <option key={index} value={option.id}>{option.name}</option>
            ))}
            
          </select>

          
          <div className="genre-checkboxes-container">
            <p>Genre Selection: </p>
            <div className="genre-checkboxes">
              {genres.map((genre) => (
                <div key={genre.id} className="genre-checkbox">
                  <label>{genre.name}</label>
                  <input
                  type="checkbox"
                  value={genre.id}
                  checked={selectedGenres.includes(genre.id)}
                  onChange={handleGenreChange}
                  >
                  </input>
                </div>
              ))}
            </div>
          </div>
          <div className="submit-button">
            <button className="glow-on-hover" type="submit">Search</button>
          </div>
        </form>
      </div>
      

      

      <div className="page-info-advanced-search">
        <button className="arrow-icon" onClick={handlePrevPage} disabled={pageNumb < 2 ? true : false}>
        <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <p className="page-number">Page: {pageNumb}</p>
        <button className="arrow-icon" onClick={handleNextPage} disabled={!moviesReturned}>
        <FontAwesomeIcon icon={faArrowRight} className="arrow-icon"/>
        </button>
      </div>
    
      {isSearching && !moviesReturned && (
        <div className="end-of-results">
          {pageNumb === 1 ? <p>No results returned</p> : <p>End of Results</p>}
        </div>
      )}

      {isSearching && moviesReturned && (
        <div className="after-search-display">
        
      <div className="filteredMoviesContainer">
          <h2 className="advanced-search-search-results-title">Search Results:</h2>
          <div className="movieCoversContainer-advanced-search">
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
          </div>
          </div>
      </div>
        )}

        {/* {!isSearching && (
=======
          </div>
        )}
          <div className="preSearch">
            <img src="/src/images/magnifying-glass.png" />
            <p>Search for Movies!</p>
          </div>
        )} */}
      
      <StickyFooter/>
    </div>
    
  );
};

export default AdvancedSearch;