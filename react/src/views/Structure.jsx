import { Container } from '@mui/material'
import React from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'

const Links = [
    {
        name: 'Відділи бібліотеки',
        link: '/'
    },
    {
        name: 'Відділи обслуговування',
        link: '/'
    },
    {
        name: 'Відділи комплектування та наукової обробки документів',
        link: '/'
    },
    {
        name: 'Відділи зберігання фондів',
        link: '/'
    },
]

function Structure() {
    return (
        <Container style={{ maxWidth: '1085px' }}>
            <h3 className={styles.title}>Структура бібліотеки</h3>
            <div className={styles.contactsWrap}>
                <div className={styles.columnWrap}>
                    <span className={styles.highlightedText}>Директор бібліотеки</span>
                    <span className={styles.highlightedText}>ПІБ</span>
                    <div className={styles.phoneCabWrap}>
                        <div style={{ paddingRight: '18px' }}>
                            <span className={styles.highlightedText}>каб.</span>
                            <span className={styles.normalText}>№00</span>
                        </div>
                        <div>
                            <span className={styles.highlightedText}>тел./факс:</span>
                            <span className={styles.normalText}>+380-xx-xx-xxxx</span>
                        </div>
                    </div>
                    <div>
                        <span className={styles.highlightedText}>email:</span>
                        <span className={styles.normalText}>name@gmail.com</span>
                    </div>
                </div>
                <div className={styles.columnWrap}>
                    <span className={styles.highlightedText}>Директор бібліотеки</span>
                    <span className={styles.highlightedText}>ПІБ</span>
                    <div className={styles.phoneCabWrap}>
                        <div style={{ paddingRight: '18px' }}>
                            <span className={styles.highlightedText}>каб.</span>
                            <span className={styles.normalText}>№00</span>
                        </div>
                        <div>
                            <span className={styles.highlightedText}>тел./факс:</span>
                            <span className={styles.normalText}>+380-xx-xx-xxxx</span>
                        </div>
                    </div>
                    <div>
                        <span className={styles.highlightedText}>email:</span>
                        <span className={styles.normalText}>name@gmail.com</span>
                    </div>
                </div>
            </div>
            <div className={styles.linksWrap}>
                {Links.map((el) => {
                    return <Link to={el.link}>{el.name}</Link>
                })}
            </div>

        </Container>
    )
}

export default Structure
