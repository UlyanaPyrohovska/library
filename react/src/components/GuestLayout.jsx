import { Navigate, Outlet } from "react-router-dom";
import { userStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
    const { currentUser, userToken } = userStateContext()

    if (userToken) {
        return <Navigate to='/'></Navigate>
    }

    return (
        <div>
            <Outlet />
        </div>
    )
}