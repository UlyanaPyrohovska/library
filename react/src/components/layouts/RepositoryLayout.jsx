import { Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import HeaderRepository from '../HeaderRepository'

function RepositoryLayout() {
    return (
        <div>
            <HeaderRepository></HeaderRepository>
            <Container sx={{ marginTop: 10, maxWidth: "1085px" }}>
                <Outlet>
                </Outlet>
            </Container>
            <Footer></Footer>
        </div>
    )
}

export default RepositoryLayout
