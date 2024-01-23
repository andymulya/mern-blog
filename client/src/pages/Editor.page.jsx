import { useCallback, useRef, useState } from "react"
import BlogEditor from "../components/BlogEditor.component"
import PublishForm from "../components/PublishForm.component"
import { useDispatch, useSelector } from "react-redux"
import { setDataPost } from "../redux/slices/postSlice"
import toast from "react-hot-toast"


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
            const save = await editorCore.current.dangerouslyLowLevelInstance?.save()

            if(save.blocks.length === 0){
                toast.dismiss(loading)
                return toast.error("Write something in your blog to publish it")
            }

            dispatch(setDataPost({ ...post, body: save.blocks }))
            toast.dismiss(loading)
            toast.success("Success")
        }catch(err){
            toast.dismiss(loading)
            toast.error(err)
        }
    }, [dispatch, post])

    console.log(post)
    return (
        <>
            <div className="flex gap-4 mt-3 mr-4 justify-end">
                <button className="btn bg-blue-800 text-white font-semibold" onClick={ handleSave }>Publish</button>
                <button className="btn bg-blue-100 text-blue-800 font-semibold" onClick={() => setStateEditor("publish")}>Save Draft</button>
            </div>
            {
                (stateEditor === "editor") ? 
                <BlogEditor handleBlogBody={ handleBlogBody } />:
                <PublishForm />
            }
        </>
    )
}