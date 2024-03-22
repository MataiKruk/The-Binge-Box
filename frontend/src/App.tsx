import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Main from "./components/Main/Main";
import Search from "./components/Search/Search";
import AdvancedSearch from "./components/AdvancedSearch/AdvancedSearch";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Home from "./components/Home/Home";
import UserPlaylist from "./components/UserPlaylist/UserPlaylist";
import MataiPlaylist from "./components/MataiPlaylist/MataiPlaylist";
import AyeshaPlaylist from "./components/AyeshaPlaylist/AyeshaPlaylist";
import MohammadPlaylist from "./components/MohammadPlaylist/MohammadPlaylist";


function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/matai's-picks:-christmas-edition-playlist" element={<MataiPlaylist/>} />
            <Route path="/mohammad's-all-time-favorites-playlist" element={<MohammadPlaylist />} />
            <Route path="/ayesha's-ghibli-picks-playlist" element={<AyeshaPlaylist />} />
            <Route path="/user-playlist" element={<UserPlaylist />} />
            <Route path="/advanced-search" element={<AdvancedSearch/>}></Route>
            <Route path="/movie/:id" element={<MovieDetails/>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
