import { useCallback, useRef, useState } from "react"
import BlogEditor from "../components/BlogEditor.component"
import PublishForm from "../components/PublishForm.component"
import { useDispatch, useSelector } from "react-redux"
import { setDataPost } from "../redux/slices/postSlice"
import toast from "react-hot-toast"
import Logo from "../components/Logo.component"
import { IconArrowLeft } from "../components/Icon.component"


export default function Editor() {
    const post = useSelector((state) => state.post)
    const dispatch = useDispatch()
    const[stateEditor, setStateEditor] = useState("editor")
    const editorCore = useRef(null)

    const handleBlogBody = useCallback((intance) => {
        editorCore.current = intance
    }, [])

    const handleSave = useCallback(async () => {

        if(!post.banner) return toast.error("Upload a blog banner to publish it")
        if(!post.title) return toast.error("Write blog title to publish it")

        const loading = toast.loading("Save ...")

        try{
            const body = await editorCore.current.dangerouslyLowLevelInstance?.save()

            if(!body.blocks.length){
                toast.dismiss(loading)
                return toast.error("Write something in your blog to publish it")
            }

            dispatch(setDataPost({ ...post, body: body.blocks }))
            toast.dismiss(loading)
            toast.success("Success")
            setStateEditor("publish")
        }catch(err){
            toast.dismiss(loading)
            toast.error(err)
        }
    }, [dispatch, post])


    return (
        <>
            {
                (stateEditor === "editor") ? 
                <nav className="navbar justify-between">
                    <Logo />
                    <div className="flex gap-2 whitespace-nowrap">
                        <button className="btn-small bg-blue-800 text-white font-semibold" onClick={ handleSave }>Publish</button>
                        <button className="btn-small bg-blue-100 text-blue-800 font-semibold" onClick={() => {}}>Save Draft</button>
                    </div>
                </nav>:
                <nav className="navbar justify-between">
                    <button className="m-4 hover:bg-gray-200 text-blue-700 p-3 rounded-full" onClick={() => setStateEditor("editor")}>
                        <IconArrowLeft />
                    </button>
                    <h1 className="font-medium uppercase">Preview</h1>
                </nav>
            }
            {
                (stateEditor === "editor") ? 
                <BlogEditor handleBlogBody={ handleBlogBody } />:
                <PublishForm />
            }
        </>
    )
}