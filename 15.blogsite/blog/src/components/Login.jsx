import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';





const theme = createTheme();


export default function Login({ authenticate }) {
    const Navigate = useNavigate()
    const [error, seterror] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.get('email').trim().length && data.get('password').trim().length > 0 ?
            checkUserData(data) : alert("Fields cant be empty")
    }


    const checkUserData = async (data) => {
        const checkdata = {
            email: data.get('email'),
            password: data.get('password')
        }
        let res = await axios.post(`http://localhost:8888/login`, checkdata)
        console.log(res)
        if(res.data.message === "Login Successfully"){
            console.log("success");
            // localStorage.setItem("user",JSON.stringify(res.data.result));
            localStorage.setItem("auth",JSON.stringify(res.data.auth));
            localStorage.setItem("refreshtoken",JSON.stringify(res.data.refreshtoken));
            localStorage.setItem("ID",JSON.stringify(res.data.id));
            Navigate('/')
        }else if(res.data.msg === "No account exists" || res.data.msg === "wrong credientials" ){
            seterror(true)
            console.log("fails")
        }
    }

    return (<>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    type="email"
                                    name="email"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    autoComplete="off"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    type="password"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    name="password"
                                    autoComplete="off"
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                        <Grid container justifyContent="flex-end">
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        <div id="recaptcha-container"></div>
        {error === true && (<><Alert severity="error">
            <AlertTitle>You don't have account</AlertTitle>
            Need account? <strong onClick={() => { Navigate('/signup') }}>Signup here!</strong>
        </Alert></>)}
    </>
    );
}