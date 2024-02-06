import { useCallback, useEffect, useRef, useState } from "react"
import BlogEditor from "../components/BlogEditor.component"
import PublishForm from "../components/PublishForm.component"
import { useDispatch, useSelector } from "react-redux"
import { setDataPost, setInitDataPost } from "../redux/slices/postSlice"
import toast from "react-hot-toast"
import Logo from "../components/Logo.component"
import { IconArrowLeft } from "../components/Icon.component"
import { createBlog, getDetailBlog } from "../services/baseApi"
import { useNavigate, useParams } from "react-router-dom"


export default function Editor() {
    const post = useSelector((state) => state.post)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const { slug } = useParams()
    const[stateEditor, setStateEditor] = useState("editor")
    const editorCore = useRef(null)
    const navigate = useNavigate()


    const handleInitialize = useCallback((intance) => {
        editorCore.current = intance
    }, [])

    const handleBlogBody = useCallback(async () => await editorCore.current.dangerouslyLowLevelInstance?.save(), [])

    const handleSave = async () => {

        if(!post.banner) return toast.error("Upload a blog banner to publish it")
        if(!post.title) return toast.error("Write blog title to publish it")

        const loading = toast.loading("Save ...")

        try{
            const body = await handleBlogBody()

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
    }

    const handleSaveDraft = async () => {
        if(!post.title) return toast.error("Write blog title to publish it")
        if(slug) return toast.error("Sorry you can't access for save in draft")

        const loading = toast.loading("Saving draft ...")

        try{

            const body = await handleBlogBody()

            setIsLoading(true)
            await createBlog("/create-blog", { ...post, body: body.blocks, draft: true })
            setIsLoading(false)
            toast.dismiss(loading)
            toast.success("Saved")

            setTimeout(() => {
                dispatch(setInitDataPost())
                navigate('/')
            }, 1000)

        }catch(err){
            setIsLoading(false)
            toast.dismiss(loading)
            toast.error(err.response.data.message)
        }
    }

    const fetchBlogDetail = useCallback(async () => {
        try{
            setIsLoading(true)
            const { blog } = await getDetailBlog({ slug, mode: "edit" })

            dispatch(setDataPost(blog))
            setIsLoading(false)
        }catch(err){
            setIsLoading(false)
            toast.error(err.response.data.message)
        }
    }, [dispatch, slug])



    useEffect(() => {
        if(slug){
            fetchBlogDetail()
        }

        return () => dispatch(setInitDataPost())
    }, [dispatch, fetchBlogDetail, slug])


    return (
        <>
            {
                (stateEditor === "editor") ? 
                <nav className="navbar justify-between">
                    <Logo />
                    <div className="flex gap-2 whitespace-nowrap">
                        <button disabled={ isLoading } className="btn-small bg-blue-800 text-white font-semibold disabled:opacity-75" onClick={ handleSave }>Publish</button>
                        {
                            (!slug) && <button disabled={ isLoading } className="btn-small bg-blue-100 text-blue-800 font-semibold disabled:opacity-75" onClick={ handleSaveDraft }>Save Draft</button>
                        }
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
                (isLoading) ? <h1>Loading ...</h1> : 
                (stateEditor === "editor") ? 
                <BlogEditor handleInitialize={ handleInitialize } />:
                <PublishForm />
            }
        </>
    )
}