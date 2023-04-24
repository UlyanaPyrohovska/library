import { Container } from '@mui/material'
import React from 'react'
import Sapiens from '../assets/img/sapiens.png'
import Slider from '../components/Slider'

function Homepage() {
    return (
        <Container>
            <Slider></Slider>
            <img src={Sapiens} width={800}></img>
        </Container>
    )
}

export default Homepage
