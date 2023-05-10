import { Navigate, Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { userStateContext } from "../contexts/ContextProvider";
import { Box, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Loader from "./Loader";


export default function DefaultLayout() {
    const { currentUser, userToken, setLoad } = userStateContext();

    // useEffect(() => {
    //     if (document.readyState === 'complete') {
    //         setLoad(false);
    //     } else {
    //         window.addEventListener('load', setLoad(false), false);
    //         return () => window.removeEventListener('load', setLoad(false));
    //     }
    // }, []);

    if (!userToken) {
        return <Navigate to='login'></Navigate>
    }

    return (
        <div>
            <Header></Header>
            <Outlet>
            </Outlet>
            <Footer></Footer>
        </div>
    )
}