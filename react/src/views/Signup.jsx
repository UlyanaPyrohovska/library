import '../assets/css/login.css'
import Logo from '../assets/img/icon.png'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import axiosClient from '../axios';
import { useState } from 'react';
import { Alert } from '@mui/material';
import { userStateContext } from '../contexts/ContextProvider';

export default function Signup() {
    const { setCurrentUser, setUserToken } = userStateContext();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setError([]);
        axiosClient.post('/signup', {
            name: fullName,
            email,
            password,
            password_confirmation: passwordConfirmation
        })
            .then(({ data }) => {
                setCurrentUser(data.user)
                setUserToken(data.token)
            })
            .catch((error) => {
                if (error.response) {
                    const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
                    console.log(finalErrors)
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
                    Реєстрація
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
                        id="name"
                        label="Повне ім'я"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={fullName}
                        onChange={ev => setFullName(ev.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Пошта"
                        name="email"
                        autoComplete="email"
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password-confirmation"
                        label="Підтвердження паролю"
                        name="password_confirmation"
                        type='password'
                        value={passwordConfirmation}
                        onChange={ev => setPasswordConfirmation(ev.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Запам'ятати мене"
                    />
                    <Button color="primary" type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>Зареєструватися</Button>
                </Box>
                <Link color="primary.darker" href="/login" variant="body2">
                    {"Зареєстровані? Увійти до облікового запису"}
                </Link>
            </Box>
        </Container>
    )
}