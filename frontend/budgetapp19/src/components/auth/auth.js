import React, {useState} from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './input'
//import {useDispatch} from 'react-redux'
//import { signUp, signIn, logOut } from '../../actions/auth'
import {useNavigate} from 'react-router-dom'

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
    const handleSubmit = (e) => {
        e.preventDefault()
        history('/home')
    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    //const switchMode = () => setIsSignup((prevIsSignup) => !prevIsSignup)
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    return (
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
        </Container>
    )
}

export default Auth
