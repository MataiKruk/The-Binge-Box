import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
 } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Browse from "./components/Browse/Browse";

function App() {

  return (
    <>
    <div className="App">
     <Router>
       <Header />
       <Routes>
         <Route path="/" element={<Main />} />
         <Route path="/browse" element={<Browse />} />
         <Route path="*" element={<Navigate to="/" />} />
       </Routes>
     </Router>
   </div>
    </>
  )
}

export default App
