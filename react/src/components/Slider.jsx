import React, { useState, useEffect, useRef } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import '../assets/css/slider.css'

export const SliderData = [
    {
        text: "Відчуйте магію слова в нашій бібліотеці, де час зупиняється, а фантазія стає реальністю. Запрошуємо вас відкрити двері до світу пригод, знань та безконечних можливостей."
    },
    {
        text: "Крокуйте у світ книжок, де багатство інформації, розваги та освіти об'єднуються. Наша бібліотека запрошує вас на відкриття нових горизонтів і пошук пригод."
    },
    {
        text: "Ласкаво просимо до нашої бібліотеки, місця, де слова оживають, і знання стають безмежними. Запрошуємо вас відкрити сторінки історій, погрузитися у світи фантазії та знайти відповіді на ваші запитання."
    },
]


function Slider() {
    const [current, setCurrent] = useState(0);
    const length = SliderData.length;

    const nextSlide = () => {
        setCurrent(current == length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current == 0 ? length - 1 : current - 1)
    }

    if (!Array.isArray(SliderData) || SliderData.length <= 0) {
        return null;
    }
    const autoPlayRef = useRef()

    useEffect(() => {
        autoPlayRef.current = nextSlide
    })

    useEffect(() => {
        const play = () => {
            autoPlayRef.current()
        }

        const interval = setInterval(play, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className='slider-wrap'>
            <div className='slider'>
                <ArrowBackIosIcon color='secondary' style={{ cursor: 'pointer' }} onClick={prevSlide} fontSize='large' />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <h1 className='title'>Репозиторій КДАДПіД</h1>
                    {SliderData.map((slide, index) => {
                        return (
                            <div
                                className={index === current ? "slide active" : "slide"}
                                key={index}
                            >
                                {index === current && (
                                    <span>{slide.text}</span>
                                )}

                            </div>
                        )

                    })}
                    <div style={{ marginTop: "40px" }}>
                        {SliderData.map((dot, index) => {
                            return (
                                <div
                                    key={index}
                                    className={index === current ? "dot active" : "dot"}
                                ></div>
                            )
                        })}
                    </div>
                </div>
                <ArrowForwardIosIcon color='secondary' style={{ cursor: 'pointer' }} onClick={nextSlide} fontSize='large' />
            </div>

        </div>
    )
}

export default Slider
