import { useOutletContext } from "react-router-dom"
import BlogEditor from "../components/BlogEditor.component"
import PublishForm from "../components/PublishForm.component"

export default function Editor() {
    const { stateEditor } = useOutletContext()
    
    return (
        (stateEditor === "editor") ? 
        <BlogEditor />:
        <PublishForm />
    )
}