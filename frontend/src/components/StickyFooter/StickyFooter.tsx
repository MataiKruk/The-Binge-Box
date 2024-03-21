import { Link } from "react-router-dom"
import "./StickyFooter.css"

function StickyFooter() {

    return (
        <>
         <footer>
                <div className="parent-icon">
                    <div className="icons">
                        {/* home */}
                        <Link to="/home">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 64 64" fill="rgba(171, 171, 171, 1)">
                                <path d="M 43.045 61.369 L 59.016 61.369 C 60.669 61.369 62.006 60.027 62 58.374 L 61.894 29.675 C 61.89 28.573 61.214 27.088 60.387 26.361 L 34.314 3.452 C 33.072 2.361 31.053 2.357 29.806 3.443 L 3.498 26.367 C 2.667 27.091 1.996 28.573 2 29.675 L 2.106 58.374 C 2.112 60.027 3.459 61.369 5.112 61.369 L 21.084 61.369 C 22.737 61.369 24.078 60.027 24.078 58.374 L 24.078 45.397 C 24.078 44.295 24.973 43.401 26.075 43.401 L 38.054 43.401 C 39.155 43.401 40.05 44.295 40.05 45.397 L 40.05 58.374 C 40.05 60.027 41.392 61.369 43.045 61.369 Z "></path>
                            </svg>
                        </Link>
                    </div>
                    
                    <div className="icons">
                        {/* search */}
                        <Link to="/search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18" fill="rgba(171, 171, 171, 1)" id="magnifying">
                                <path d="m17.545 15.467-3.779-3.779a6.15 6.15 0 0 0 .898-3.21c0-3.417-2.961-6.377-6.378-6.377A6.185 6.185 0 0 0 2.1 8.287c0 3.416 2.961 6.377 6.377 6.377a6.15 6.15 0 0 0 3.115-.844l3.799 3.801a.953.953 0 0 0 1.346 0l.943-.943c.371-.371.236-.84-.135-1.211zM4.004 8.287a4.282 4.282 0 0 1 4.282-4.283c2.366 0 4.474 2.107 4.474 4.474a4.284 4.284 0 0 1-4.283 4.283c-2.366-.001-4.473-2.109-4.473-4.474z"></path>
                            </svg>
                        </Link>
                    </div>

                    <div className="icons">
                        {/* my playlist */}
                        <Link to="/user-playlist">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48" fill="rgba(171, 171, 171, 1)" id="movie">
                                <path d="m36 8 4 8h-6l-4-8h-4l4 8h-6l-4-8h-4l4 8h-6l-4-8H8c-2.21 0-3.98 1.79-3.98 4L4 36c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V8h-8z"></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </svg>
                        </Link>
                    </div>

                    <div className="icons">
                        {/* advanced search */}
                        <Link to="/advanced-search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" id="ellipsis" viewBox="0 0 64 64" fill="rgba(171, 171, 171, 1)">
                                <path d="M42 30c-3.312 0-6-2.688-6-6s2.688-6 6-6 6 2.688 6 6-2.688 6-6 6zm-18 0c-3.312 0-6-2.688-6-6s2.688-6 6-6 6 2.688 6 6-2.688 6-6 6zM6 30c-3.312 0-6-2.688-6-6s2.688-6 6-6 6 2.688 6 6-2.688 6-6 6z"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
            </footer>
      </>
    )
}
  
  export default StickyFooter;