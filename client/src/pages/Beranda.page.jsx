import { useSelector } from "react-redux"

export default function Beranda() {
    const { user } = useSelector((state) => state.user)
    
    return (
        <>
            <h1>Beranda</h1>
            <h1>{ user.fullName }</h1>
        </>
    )
}