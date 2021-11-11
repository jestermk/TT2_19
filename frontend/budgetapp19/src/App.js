import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import "bootstrap/dist/css/bootstrap.min.css";
import Auth from './components/auth/auth';
import Header from './components/home/header';
import Home from './components/home/home';
import Project from "./components/project/project";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const App = () => {
  
  return (
    <BrowserRouter>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" exact element={<Auth/>}/>
          <Route path="/home" exact element={<Home/>}/>
          <Route path="/home/project/:id" element={<Project />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App

