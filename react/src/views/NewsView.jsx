import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { userStateContext } from '../contexts/ContextProvider';
import styles from './styles.module.css'
import axiosClient from '../axios';

function NewsView() {
    const [news, setNews] = useState([{
        title: "",
        slug: "",
        body: "",
        image: null,
        image_url: null,
    }
    ]
    );
    const { slug } = useParams();
    const navigate = useNavigate();
    const { setLoad } = userStateContext();

    const getNews = (id) => {
        setLoad(true);
        axiosClient.get(`/news/${id}`).then(({ data }) => {
            setNews(data.data);
            setLoad(false);
        }).catch(err => {
            console.log(err);
            navigate('/not-found')
        })
    }

    useEffect(() => {
        setLoad(true);
        axiosClient
            .get(`news/get-by-slug/${slug}`)
            .then(({ data }) => {
                setLoad(false);
                setNews(data.data);
            })
            .catch(() => {
                setLoad(false);
                navigate('/not-found')
            });
    }, []);


    return (
        <Container style={{ maxWidth: '1085px' }}>
            <h3 className={styles.title}>{news.title}</h3>
            {news?.image_url && <img style={{ float: 'right', padding: '0 0 20px 20px' }} src={news.image_url} height={400}></img>}
            <p style={{ textAlign: 'justify' }}>{news.body}</p>
            <span className='news-date'>{news.created_at}</span>
        </Container>
    )
}

export default NewsView
