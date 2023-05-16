import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { userStateContext } from "../contexts/ContextProvider";
import { Container } from "@mui/material";



export default function DefaultLayout() {
    return (
        <div>
            <Header></Header>
            <Container>
                <Outlet>
                </Outlet>
            </Container>
            <Footer></Footer>
        </div>
    )
}