import { Container } from '@mui/material'
import styles from './styles.module.css'
import React from 'react'

function Contacts() {
    return (
        <Container style={{ maxWidth: '1085px' }}>
            <h3 className={styles.title}>Контакти</h3>
            <p className={styles.highlightedText}>Бібліотека Київської державної академії
                декоративно-прикладного мистецтва і дизайна ім.М.Бойчука</p>
            <p className={styles.highlightedText}>Адреса:01014, м. Київ, вул. М. Бойчука (Кіквідзе), 32</p>
            <p className={styles.highlightedText}>тел./факс +380-xx-xx-xxxx</p>
            <p className={styles.highlightedText}>e-mail: name@gmail.com</p>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5085.432447782113!2d30.550257!3d50.409126!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf5d23b8b425%3A0xc2ba29ed775ff2c6!2z0YPQuy4g0JrQuNC60LLQuNC00LfQtSwgMzIsINCa0LjQtdCyLCAwMjAwMA!5e0!3m2!1sru!2sua!4v1683712286226!5m2!1sru!2sua"
                width="100%"
                height="450"
                style={{ border: "0px", borderRadius: "50px" }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        </Container>
    )
}

export default Contacts
