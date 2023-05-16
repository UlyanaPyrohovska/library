import { React } from 'react'
import '../assets/css/header.css';
import Logo from '../assets/img/logo.png';
import Lupa from '../assets/img/lupa.png'
import { Link, NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box } from '@mui/material';
import { userStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';


function HeaderRepository() {
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
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <NavLink to="/repo">
                    <HomeRoundedIcon fontSize='large' color='primary.darker'></HomeRoundedIcon>
                </NavLink>
            </Box>
            {/* <NavLink to="/repo">
                <div className="buttons">
                    <HomeRoundedIcon></HomeRoundedIcon>
                </div>
            </NavLink> */}
            <Button main={{ name: "Перегляд", href: "/repo" }} contents={[{ name: "Розділи та колекції", href: "/geninfo" }, { name: "Роком випуску", href: "/structure" }, { name: "Автором", href: "/schedule" }, { name: "Назвою", href: "/contacts" }, { name: "Ключовм словом", href: "/contacts" }, { name: "Нові надходження", href: "/contacts" }]}></Button>
            <Button main={{ name: "Довідка", href: "/info" }}></Button>
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

export default HeaderRepository
