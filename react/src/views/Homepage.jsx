import { Container, Stack } from '@mui/material'
import React from 'react'
import Sapiens from '../assets/img/sapiens.png'
import Slider from '../components/Slider'
import NewsLayout from '../components/NewsLayout'
import '../assets/css/homepage.css'
import LinksLayout from '../components/LinksLayout'

function Homepage() {
    return (
        <Container>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Slider />
                <img src={Sapiens} width={500}></img></Stack>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <NewsLayout></NewsLayout>
                <div className='separator'></div>
                <LinksLayout></LinksLayout>
            </Stack>
        </Container>
    )
}

export default Homepage
