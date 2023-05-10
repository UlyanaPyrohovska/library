import { Container } from '@mui/material'
import React from 'react'
import styles from './styles.module.css'
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import ContactPhoneRoundedIcon from '@mui/icons-material/ContactPhoneRounded';
import { NavLink } from 'react-router-dom';

function About() {
    const Button = ({ children, name, link }) => {
        return (
            <NavLink style={{ textDecoration: 'none' }} to={link}>
                <div className={styles.buttonWrap}>
                    <div className={styles.button}>
                        {children}
                    </div>
                    <h3>{name}</h3>
                </div>
            </NavLink>
        )
    };

    return (
        <Container style={{ maxWidth: '1085px' }}>
            <h1 className={styles.title}>Про бібліотеку</h1>
            <div className={styles.buttonContainer}>
                <Button link={'/geninfo'} name={'Загальна інформація'}>
                    <ArticleRoundedIcon sx={{ fontSize: 120, color: 'white' }}></ArticleRoundedIcon>
                </Button>
                <Button link={'/structure'} name={'Структура бібліотеки'}>
                    <HomeRoundedIcon sx={{ fontSize: 120, color: 'white' }}></HomeRoundedIcon>
                </Button>
                <Button link={'/schedule'} name={'Години роботи'}>
                    <WatchLaterRoundedIcon sx={{ fontSize: 120, color: 'white' }}></WatchLaterRoundedIcon>
                </Button>
                <Button link={'/contacts'} name={'Контакти'}>
                    <ContactPhoneRoundedIcon sx={{ fontSize: 120, color: 'white' }}></ContactPhoneRoundedIcon>
                </Button>
            </div>
        </Container>
    )
}

export default About
