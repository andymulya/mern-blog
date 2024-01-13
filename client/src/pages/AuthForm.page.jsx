import { useLocation } from "react-router-dom"

export default function AuthForm(){
    const { pathname } = useLocation()
    const type = pathname.slice(1)

    return (
        <h1>{ type }</h1>
    )
}