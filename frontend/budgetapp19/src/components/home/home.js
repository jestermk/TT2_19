import React, {useState} from 'react'
import {Button} from '@material-ui/core'
import { useNavigate } from 'react-router';

const Home = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const history = useNavigate()
    const logout = () => {    
        history('/');
        setUser(null);
        localStorage.clear()
      };
    return (
        <div>
            <h2>WELCOME TO BUDGET APP by group 19 :D</h2>
            <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
        </div>
    )
}

export default Home
