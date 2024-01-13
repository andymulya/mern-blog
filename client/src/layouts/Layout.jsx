import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar.component"

const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Layout