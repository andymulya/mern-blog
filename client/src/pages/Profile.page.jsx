import { useParams } from "react-router-dom"

export default function Profile() {
    const { id: username } = useParams()

    return(
        <h1>{ username }</h1>
    )
}