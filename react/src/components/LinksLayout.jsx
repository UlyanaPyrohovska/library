import React from 'react'

const links = [
    {
        title: "Електорнний каталог",
        link: "https://www.youtube.com/"
    },
    {
        title: "Отримати УДК/JEL",
        link: "https://www.youtube.com/"
    },
    {
        title: "Репозиторій КДАДПіД",
        link: "https://www.youtube.com/"
    },
    {
        title: "Наукова періодика КДАДПіД",
        link: "https://www.youtube.com/"
    },
]
function LinksLayout() {
    return (
        <div className='links-layout'>
            <h4 className='links-layout-title'>Корисні посилання</h4>
            {links.map((item, index) => {
                return (
                    <a href={item.link} key={index}>{item.title}</a>
                )
            })}
        </div>
    )
}

export default LinksLayout
