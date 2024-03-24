import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Search from "./components/Search/Search";
import AdvancedSearch from "./components/AdvancedSearch/AdvancedSearch";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Home from "./components/Home/Home";
import UserPlaylist from "./components/UserPlaylist/UserPlaylist";
import SignIn from "./components/SignIn/SignIn";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/user-playlist" element={<UserPlaylist />} />
            <Route path="/advanced-search" element={<AdvancedSearch />}></Route>
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
