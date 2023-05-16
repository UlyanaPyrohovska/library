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
import AdminLayout from "./components/AdminLayout"
import AdminPanel from "./views/admin/AdminPanel"
import NewsAdmin from "./views/admin/NewsAdmin"
import NewsAdd from "./views/admin/NewsAdd"
import UserAdmin from "./views/admin/UserAdmin"
import NewsLayout from "./components/NewsLayout"
import NotFound from "./views/NotFound"
import NewsView from "./views/NewsView"

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
                {
                    path: '/news',
                    element: <NewsLayout />
                },
                {
                    path: '/news/:slug',
                    element: <NewsView />
                },
                {
                    path: '/not-found',
                    element: <NotFound />
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
        },
        {
            path: '/admin',
            element: <AdminLayout />,
            children: [
                {
                    path: '/admin',
                    element: <AdminPanel />
                },
                {
                    path: '/admin/news',
                    element: <NewsAdmin />
                },
                {
                    path: '/admin/news/add',
                    element: <NewsAdd />
                },
                {
                    path: '/admin/news/:id',
                    element: <NewsAdd />
                },
                {
                    path: '/admin/users',
                    element: <UserAdmin />
                },
            ]
        }
    ])

export default router