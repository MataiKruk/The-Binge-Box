import { useState, useEffect } from "react";
import Playlist from "../../models/Playlist";
import { getMohammadPlaylist } from "../../services/playlistAPI";
import { NavLink } from "react-router-dom";
import StickyFooter from "../StickyFooter/StickyFooter";
import "./MohammadPlaylist.css";

function MohammadPlaylist() {
  const posterUrl = "https://image.tmdb.org/t/p/w200";
  const [mohammadPlaylist, setMohammadPlaylist] = useState<Playlist | null>(null);
  const [seenStatus, setSeenStatus] = useState<boolean[]>([]);

  useEffect(() => {
    getMohammadPlaylist("65fc183c66f73478ed83caa0").then((playlist) => {
      setMohammadPlaylist(playlist);
      setSeenStatus(new Array(playlist?.movies.length || 0).fill(false));
    });
  }, []);

  const toggleSeenStatus = (index: number) => {
    setSeenStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = !newStatus[index];
      return newStatus;
    });
  };

  if (!mohammadPlaylist) {
    return null; //don't do anything
  }

  // percentage of movies seen
  const percentSeen = Math.floor((seenStatus.filter(seen => seen).length / mohammadPlaylist.movies.length) * 100);

  // Define inline style for the progress bar width
  const progressBarStyle = {
    width: `${percentSeen}%`,
  };

  return (
    <>
      <div className="mohammad-body">
        <h1 className="mohammad-playlist-name">Mohammad's All-Time Favorites!</h1>
        <footer className="mohammad-full-container-progress-bar">
        <h3 className="mohammad-progress-bar-title">Track Your Progress!</h3>
        <div className="mohammad-progress-container">
        <div className="mohammad-progress-bar" style={progressBarStyle}></div>
        </div>
        </footer>
        <div>
          {mohammadPlaylist.movies.map((movie, index) => (
            <div className="mohammad-movie-container-parent" key={index}>
              <NavLink to={`/movie/${movie.id}`}>
                {movie.poster_path && (
                  <img
                    className="mohammad-movie-poster"
                    src={posterUrl + movie.poster_path}
                    alt={movie.title}
                  />
                )}
              </NavLink>
              <div className="mohammad-movie-container-child">
                <h2 className="mohammad-movie-title">{movie.title}</h2>
                <div className="mohammad-movie-checkbox">
                  <p className={seenStatus[index] ? "mohammad-seen" : "mohammad-not-seen"} onClick={() => toggleSeenStatus(index)}>
                    {seenStatus[index] ? "Have Seen" : "Not Seen"}
                  </p>
                  {seenStatus[index] ? (
                    <svg
                      className="mohammad-svg"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 53 53"
                      id="have-seen-eye"
                      onClick={() => toggleSeenStatus(index)}
                    >
                      <path
                        className="mohammad-seen-eye-svg-color"
                        d="M24 9C14 9 5.46 15.22 2 24c3.46 8.78 12 15 22 15 10.01 0 18.54-6.22 22-15-3.46-8.78-11.99-15-22-15zm0 25c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10zm0-16c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="mohammad-not-seen-svg"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 30 30"
                      id="have-not-seen-eye"
                      onClick={() => toggleSeenStatus(index)}
                    >
                      <g
                        fill="none"
                        fillRule="evenodd"
                        stroke="#56cde5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path
                          className="mohammad-not-seen-eye-svg-color"
                          d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"
                        ></path>
                      </g>
                    </svg>
                  )}
                </div>
                <p className="mohammad-movie-overview">{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <StickyFooter></StickyFooter>
    </>
  );
}

export default MohammadPlaylist;