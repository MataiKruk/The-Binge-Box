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

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/search" element={<Search />} />
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
