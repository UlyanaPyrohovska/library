import React, { useEffect, useMemo, useState } from 'react'
import NewsComponent from './NewsComponent'
import { Pagination } from '@mui/material'
import axiosClient from '../axios';
import { userStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';

export function usePagination(data, itemsPerPage) {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.length / itemsPerPage);

    function currentData() {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data.slice(begin, end);
    }

    function next() {
        setCurrentPage(Math.min(currentPage + 1, maxPage));
    }

    function prev() {
        setCurrentPage(Math.max(currentPage - 1, 1));
    }

    function jump(page) {
        const pageNumber = Math.max(1, page);
        setCurrentPage(Math.min(pageNumber, maxPage));
    }

    return { next, prev, jump, currentData, currentPage, maxPage };
}

function NewsLayout() {
    const { setLoad } = userStateContext();
    let [page, setPage] = useState(1);
    let navigate = useNavigate();

    const routeChange = (slug) => {
        let path = `/news/${slug}`;
        navigate(path);
    }
    const [news, setNews] = useState([{
        title: "",
        slug: "",
        body: "",
        image: null,
        image_url: null,
    }
    ]
    );

    const NewsComponent = ({ title, text, time, slug }) => {
        return (
            <div className='news-el-wrap'>
                <div className='news-row'>
                    <h4 className='news-el-title'>{title}</h4>
                    <span className='news-date'>{time}</span>
                </div>
                <span>{text}</span>
                <button onClick={() => routeChange(slug)} className='news-read-more'>Читати далі</button>
            </div>
        )
    }

    const getNews = () => {
        setLoad(true);
        axiosClient.get('/news').then(({ data }) => {
            const aux = [];
            data.data.map((el) => {
                let n = el.created_at.slice(0, 10);
                let l = el.body.slice(0, 200) + '...';
                aux.push({ ...el, body: l, created_at: n });
            })
            setNews(aux);
            setLoad(false);
        })
    }

    useEffect(() => {
        getNews();
    }, []);

    const numOfElements = 5;

    const _DATA = usePagination(news, numOfElements);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };
    return (
        <div>
            <h2 className='news-title'>Новини та події</h2>
            {_DATA.currentData().map((item, index) => {
                return (
                    <NewsComponent title={item.title} text={item.body} time={item.created_at} key={index} slug={item.slug}></NewsComponent>
                )
            })}
            <Pagination
                count={_DATA.maxPage}
                size="large"
                page={page}
                onChange={handleChange}
                color='primary'
                style={{ marginTop: "40px" }}
            />
        </div>
    )
}

export default NewsLayout
