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
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#D9C1AB',
            darker: '#5E3228',
        }
    },
});

export default function Login() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };
    return (
        <ThemeProvider theme={theme}>
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
                            autoFocus
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
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
                                <Link color="primary.darker" href="#" variant="body2">
                                    {"Немає аккаунту? Зареєсруватись"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}