import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./components/Search/Search";
import AdvancedSearch from "./components/AdvancedSearch/AdvancedSearch";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Home from "./components/Home/Home";
import UserProfile from "./components/UserProfile/UserProfile";
import SignIn from "./components/SignIn/SignIn";
import MataiPlaylist from "./components/MataiPlaylist/MataiPlaylist";
import AyeshaPlaylist from "./components/AyeshaPlaylist/AyeshaPlaylist";
import MohammadPlaylist from "./components/MohammadPlaylist/MohammadPlaylist";
import Header from "./components/Header/Header";
import SignInForm from "./components/SignIn/SignInForm";
import SignUpForm from "./components/SignUp/SignUpForm";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route
              path="/matai's-picks:-christmas-edition-playlist"
              element={<MataiPlaylist />}
            />
            <Route
              path="/mohammad's-all-time-favorites-playlist"
              element={<MohammadPlaylist />}
            />
            <Route
              path="/ayesha's-ghibli-picks-playlist"
              element={<AyeshaPlaylist />}
            />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/advanced-search" element={<AdvancedSearch />}></Route>
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
