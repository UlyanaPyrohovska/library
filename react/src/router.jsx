import { createBrowserRouter } from "react-router-dom"
import Login from "./views/Login"
import GuestLayout from "./components/GuestLayout"
import DefaultLayout from "./components/DefaultLayout"
import Homepage from "./views/Homepage"
import Signup from "./views/Signup"
import About from "./views/AboutPage"
import GeneralInfo from "./views/GenInfo"
import Schedule from "./views/Schedule"
import Contacts from "./views/Contacts"
import Structure from "./views/Structure"

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <DefaultLayout />,
            children: [
                {
                    path: '/',
                    element: <Homepage />
                },
                {
                    path: '/about',
                    element: <About />
                },
                {
                    path: '/geninfo',
                    element: <GeneralInfo />
                },
                {
                    path: '/schedule',
                    element: <Schedule />
                },
                {
                    path: '/contacts',
                    element: <Contacts />
                },
                {
                    path: '/structure',
                    element: <Structure />
                },
            ]
        },
        {
            path: '/',
            element: <GuestLayout />,
            children: [
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '/signup',
                    element: <Signup />
                }
            ]
        }
    ])

export default router