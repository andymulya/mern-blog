import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

export default function PrivatePage() {
    const { user } = useSelector((state) => state.user)

    return (
        (user.token) ?
        <Outlet />:
        <Navigate to={"/"} />
    )
}