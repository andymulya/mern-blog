import { useSelector } from "react-redux"

export default function Profile() {
    const { user } = useSelector((state) => state.user)

    return(
        <h1>{ user.fullName }</h1>
    )
}