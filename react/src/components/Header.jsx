import { React } from 'react'
import '../assets/css/header.css';
import Logo from '../assets/img/logo.png';
import Lupa from '../assets/img/lupa.png'
import Button from './Button'
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box } from '@mui/material';
import { userStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios';


export default function Header() {
    const { setCurrentUser, setUserToken } = userStateContext()

    const logout = (ev) => {
        ev.preventDefault();
        axiosClient.post('/logout')
            .then(res => {
                setCurrentUser({});
                setUserToken(null);
            });
    }

    return (
        <div id='navbar'>
            <a href="">
                <div className="logo">
                    <img src={Logo}></img>
                </div>
            </a>
            <Button name={"Про бібілотеку"} contents={["Розділи та колекції", "Роко", "Автором", "Назвою", "Ключовим словом", "Нові надходження"]}></Button>
            <Button name={"Сервіси та послуги"} contents={["Розділи та колекції", "Роком випуску", "Автором", "Назвою", "Ключовим словом", "Нові надходження"]}></Button>
            <Button name={"Ресурси"} contents={["Розділи та колекції", "Роком випуску", "Автором", "Назвою", "Ключовим словом", "Нові надходження"]}></Button>
            <Button name={"Новини"} contents={["Розділи та колекції", "Роком випуску", "Автором", "Назвою", "Ключовим словом", "Нові надходження"]}></Button>
            <a href="">
                <div className="search-box">
                    <img className="lupa" src={Lupa}></img>
                </div>
            </a>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <Link href='#' onClick={(ev) => logout(ev)}>
                    <LogoutIcon fontSize='large' color='primary.darker'></LogoutIcon>
                </Link>
            </Box>



        </div>
    )
}