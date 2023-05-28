import { React } from 'react'
import '../assets/css/header.css';
import Logo from '../assets/img/logo.png';
import Lupa from '../assets/img/lupa.png'
import { Link, NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box } from '@mui/material';
import { userStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios';


export default function Header() {
    const { setCurrentUser, setUserToken, setLoad } = userStateContext()

    const logout = (ev) => {
        ev.preventDefault();
        setLoad(true);
        axiosClient.post('/logout')
            .then(res => {
                setCurrentUser({});
                setUserToken(null);
            });
    }

    const Button = (props) => {
        return (
            <div className="dropdown" href="">
                <NavLink to={props.main.href}>
                    <div className="buttons">{props.main.name}</div>
                </NavLink>
                {props.contents && <div className="dropdown-content">
                    {props.contents.map((item, i) => <NavLink to={item.href} key={i}>{item.name}</NavLink>)}
                </div>}
            </div>
        )
    }

    return (
        <div id='navbar'>
            <NavLink to="/">
                <div className="logo">
                    <img width={305} src={Logo}></img>
                </div>
            </NavLink>
            <Button main={{ name: "Про бібілотеку", href: "/about" }} contents={[{ name: "Загальна інформація", href: "/geninfo" }, { name: "Структура бібліотеки", href: "/structure" }, { name: "Години роботи", href: "/schedule" }, { name: "Контакти", href: "/contacts" }]}></Button>
            <Button main={{ name: "Сервіси та послуги", href: "/about" }} contents={[{ name: "Користувачам", href: "/" }, { name: "Онлайн сервіси", href: "/" }, { name: "Розділи та колекції", href: "/" }, { name: "Співпраця", href: "/" }]}></Button>
            <Button main={{ name: "Ресурси", href: "/about" }} contents={[{ name: "Е-Ресурси", href: "/" }, { name: "Бібліографічні ресурси", href: "/" }, { name: "Передплачені ресурси", href: "/" }, { name: "Ресурси відкритого доступу", href: "/" }]}></Button>
            <Button main={{ name: "Новини", href: "/news" }}></Button>
            <a href="/repo/search">
                <div className="search-box">
                    <img className="lupa" src={Lupa}></img>
                </div>
            </a>
            {/* <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <Link href='#' onClick={(ev) => logout(ev)}>
                    <LogoutIcon fontSize='large' color='primary.darker'></LogoutIcon>
                </Link>
            </Box> */}
        </div>
    )
}