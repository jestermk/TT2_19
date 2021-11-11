import React, {useState, useEffect} from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './input'
//import {useDispatch} from 'react-redux'
//import { signUp, signIn, logOut } from '../../actions/auth'
import {useNavigate, useLocation} from 'react-router-dom'
import Home from '../home/home';

const users = [
    {
        "id": 1,
        "username": "user101",
        "password": "123456",
        "name": "Jacky",
        "appointment": "Project Lead"
    },
    {
        "id": 2,
        "username": "user102",
        "password": "123456",
        "name": "Jane",
        "appointment": "Project Manager"
    },
    {
        "id": 3,
        "username": "user103",
        "password": "123456",
        "name": "Tom",
        "appointment": "Project Manager"
    },
    {
        "id": 4,
        "username": "user104",
        "password": "123456",
        "name": "Helen",
        "appointment": "Project Manager"
    },
    {
        "id": 5,
        "username": "user105",
        "password": "123456",
        "name": "Mark",
        "appointment": "Senior Project Manager"
    }
]

const Auth = () => {
    const classes = useStyles()
    //const dispatch = useDispatch()
    const history = useNavigate()
    const initialState = {
        username : '',
        password : '',
    }
    //const [isSignup, setIsSignup] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = users.filter((user) => user.username === formData.username)
        if (!user.length) {
            alert("No such user!")
        } else {
            if (user[0].password === formData.password) {
                localStorage.setItem('profile', JSON.stringify(formData))
                history('/home')
            } else {
                alert("Wrong credentials!")
            }
        }
    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    //const switchMode = () => setIsSignup((prevIsSignup) => !prevIsSignup)
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    useEffect(() => {
        //const token = user?.token;
    
        //if (token) {
        //  const decodedToken = decode(token);
    
        //  if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        //}
    
        setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location]);
    
    return (
        <>
        {user ? <Home /> :
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Sign in</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Input name="username" label="Username" handleChange={handleChange} autoFocus/>
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Sign In</Button>
                </form>
            </Paper>
        </Container>}
        </>
    )
}

export default Auth
