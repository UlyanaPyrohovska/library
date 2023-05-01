import { Navigate, Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { userStateContext } from "../contexts/ContextProvider";
import { Box, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";


export default function DefaultLayout() {

    useEffect(() => {
        const timer = setTimeout(() => { setIsLoading(false) }, 1000);
        return () => { clearTimeout(timer); };
    }, []);

    const { currentUser, userToken } = userStateContext()
    const [isLoading, setIsLoading] = useState(true);

    if (!userToken) {
        return <Navigate to='login'></Navigate>
    }

    const showLoader = () => {
        return (
            <Box padding={'40vh 0 '} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <CircularProgress size={150}></CircularProgress>
            </Box>
        );
    };


    return (
        <>
            <div style={{ display: isLoading ? "block" : "none" }} >
                {showLoader()}
            </div >
            <div style={{ display: isLoading ? "none" : "block" }}>
                <Header></Header>
                <Outlet>
                </Outlet>
                <Footer></Footer>
            </div>
        </>

    )
}