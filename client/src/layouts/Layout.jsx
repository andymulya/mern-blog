import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar.component"


export const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}