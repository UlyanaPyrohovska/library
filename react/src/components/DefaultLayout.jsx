import { Navigate, Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { userStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";


export default function DefaultLayout() {
    const { currentUser, userToken } = userStateContext()

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