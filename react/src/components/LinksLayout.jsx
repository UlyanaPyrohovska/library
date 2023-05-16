import React from 'react'

const links = [
    {
        title: "Електорнний каталог",
        link: "/repo"
    },
    {
        title: "Отримати УДК/JEL",
        link: "/repo"
    },
    {
        title: "Репозиторій КДАДПіД",
        link: "/repo"
    },
    {
        title: "Наукова періодика КДАДПіД",
        link: "/repo"
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
