import '../assets/css/login.css'
import Logo from '../assets/img/icon.png'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axiosClient from '../axios';
import { userStateContext } from '../contexts/ContextProvider';
import { useState } from 'react';

export default function Login() {
    const { setCurrentUser, setUserToken } = userStateContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setError([]);
        axiosClient.post('/login', {
            email,
            password,
            rememberMe
        })
            .then(({ data }) => {
                setCurrentUser(data.user)
                setUserToken(data.token)
            })
            .catch((error) => {
                if (error.response) {
                    const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
                    setError(finalErrors)
                }
                console.error(error)
            });
    };
    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>

                <Avatar sx={{ m: 1, bgcolor: 'white', width: 100, height: 100 }} src={Logo}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Вхід
                </Typography>
                {error.map((item, id) => {
                    return (
                        <Alert severity="error">{item}</Alert>
                    )
                })
                }
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Пошта"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Пароль"
                        name="password"
                        autoComplete="password"
                        type='password'
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value={rememberMe} onChange={ev => setRememberMe(ev.target.value)} color="primary" />}
                        label="Запам'ятати мене"
                    />
                    <Button color="primary" type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>Вхід</Button>
                    <Grid container>
                        <Grid item xs>
                            <Link color="primary.darker" href="#" variant="body2">
                                Забули пароль?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link color="primary.darker" href="/signup" variant="body2">
                                {"Немає аккаунту? Зареєструватись"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}