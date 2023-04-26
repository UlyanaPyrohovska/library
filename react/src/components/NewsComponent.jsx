import React from 'react'

function NewsComponent({ title, text, time }) {
    return (
        <div className='news-el-wrap'>
            <div className='news-row'>
                <h4 className='news-el-title'>{title}</h4>
                <span className='news-date'>{time}</span>
            </div>
            <span>{text}</span>
            <button className='news-read-more'>Читати далі</button>
        </div>
    )
}

export default NewsComponent
