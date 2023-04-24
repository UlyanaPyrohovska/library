import { Box, Container, Stack } from '@mui/material'
import React, { useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

export const SliderData = [
    {
        text: '1Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem doloribus quisquam quis ea nobis, rem, illum saepe dolor dignissimos ipsum adipisci excepturi aperiam non eveniet iste repellendus quae quam? Animi!'
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
    return (
        <Stack direction="row" spacing={1}>
            <ArrowBackIosIcon color='secondary' style={{ cursor: 'pointer' }} onClick={prevSlide} fontSize='large' />
            {SliderData.map((slide, index) => {
                return (
                    <Box
                        style={index === current ? { display: "block" } : { display: "none" }}
                        key={index}
                    >
                        {index === current && (
                            <Box fontSize="large" color="primary.darker"
                                sx={
                                    {
                                        fontWeight: "500",
                                        fontSize: "18px",
                                        lineHeight: "22px",
                                        maxWidth: "430px"
                                    }
                                }
                            >{slide.text}</Box>
                        )}
                    </Box>
                )

            })}
            <ArrowForwardIosIcon color='secondary' style={{ cursor: 'pointer' }} onClick={nextSlide} fontSize='large' />
        </Stack>
    )
}

export default Slider
