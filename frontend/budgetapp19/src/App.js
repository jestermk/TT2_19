import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home/Home";
import Project from "./components/Project/Project";

function App() {
  return (
    <Router>
      <Header />
      <div>
          <Routes> 
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/projects/:id" element={<Project />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
