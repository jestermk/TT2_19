import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import Auth from './components/auth/auth'
import Home from './components/home/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
const App = () => {
  
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" exact element={<Auth/>}/>
          <Route path="/home" exact element={<Home/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App

