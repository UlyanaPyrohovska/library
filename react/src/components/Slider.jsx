import React, { useState, useEffect, useRef } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import '../assets/css/slider.css'

export const SliderData = [
    {
        text: '1Lörem ipsum gönt mavis i multinesm bloggbävning mobillångfilm poddsändning såväl som ekogisk.Mp3-spelare vandrande skolbuss, än dra ett streck i sanden kontrasion och Viktor Nordin heteronetik i paddeltennis.Stuprörspolitik kuddbok emedan biofoni att fröbomba inte sudoku preosmos rödgrönrosa, inte konlog ifall kuratera samt halmdocka.'
    },
    {
        text: '2Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem doloribus quisquam quis ea nobis, rem, illum saepe dolor dignissimos ipsum adipisci excepturi aperiam non eveniet iste repellendus quae quam? Animi!'
    },
    {
        text: '3Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem doloribus quisquam quis ea nobis, rem, illum saepe dolor dignissimos ipsum adipisci excepturi aperiam non eveniet iste repellendus quae quam? Animi!'
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
