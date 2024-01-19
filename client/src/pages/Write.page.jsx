import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export default function Write() {
    const { user } = useSelector((state) => state.user)

    return (
        (user.token) ?
        <h1>Write</h1> :
        <Navigate to={"/"} />
    )
}