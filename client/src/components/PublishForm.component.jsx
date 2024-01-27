import { useDispatch, useSelector } from "react-redux"
import { AnimationWrapper } from "./Animations.component"
import { getDataForm } from "../utils"
import { setDataPost, setInitDataPost } from "../redux/slices/postSlice"
import TagWithDelete from "./TagWithDelete.component"
import toast from "react-hot-toast"
import { useState } from "react"
import { createBlog } from "../services/baseApi"
import { useNavigate } from "react-router-dom"


const PublishForm = () => {
    const post = useSelector((state) => state.post)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const characterLimitDesc = 200
    const tagsLimit = 10

    const handleKeyDown = (e) => {
        if(e.key === "Enter" || e.keyCode === 13) e.preventDefault()
    }

    const handleFormPublishChange = () => {
        const input = document.getElementById("formPublish")
        const { blogTitle, blogDesc } = getDataForm(input)

        dispatch(setDataPost({ ...post, title: blogTitle, desc: blogDesc }))
    }

    const handleKeyDownTag = (e) => {
        if(e.key === "Enter" || e.keyCode === 13){
            e.preventDefault()
            const tag = e.target.value.trim()

            if(tag){
                if(post.tags.length == tagsLimit) return toast.error("You have reached the limit")
                if(post.tags.includes(tag)) return toast.error("You have the same tag")

                dispatch(setDataPost({ ...post, tags: [...post.tags, tag] }))
                e.target.value = null
            }

        }
    }

    const handlePublishForm = async (e) => {
        e.preventDefault()
        
        if(!post.title) return toast.error("You must provide a title to publish the blog")
        if(!post.desc || !post.desc > 200) return toast.error("You must provide a description and under 200 characters to publish the blog")
        if(!post.tags.length || post.tags.length > 10) return toast.error("You must provide tag and max 10 tag to publish")
        
        const loading = toast.loading("Publishing....")

        try{
            setIsLoading(true)
            await createBlog("/create-post", { ...post, draft: false })
            setIsLoading(false)
            toast.dismiss(loading)
            toast.success("Published")

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


    return (
        <AnimationWrapper transition={{ duration: 0.5 }}>
            <section className="flex flex-col lg:flex-row lg:gap-10 px-5 max-w-[700px] lg:max-w-[1000px] mb-8 mx-auto mt-5">
                
                <section className="lg:flex lg:flex-col justify-center lg:w-3/4">
                    {/* Banner */}
                    <div className="aspect-video overflow-hidden rounded-lg">
                        <img src={ post.banner } alt="Blog Banner" className="w-full object-cover rounded-lg"/>
                    </div>

                    <h1 className="font-medium text-4xl max-md:text-3xl my-2">{ post.title }</h1>
                    <p className="text-gray-600 mt-4">{ (post.desc) ? post.desc : "This is a short description" }</p>
                </section>

                <section className="mt-10 lg:w-3/4 lg:mt-0">
                    
                    {/* Form Publish */}
                    <form id="formPublish" className="mt-12 mb-2 flex flex-col gap-5" onSubmit={ handlePublishForm } onKeyDown={ handleKeyDown } onChange={ handleFormPublishChange }>
                        {/* Blog Title */}
                        <div>
                            <label htmlFor="blogTitle" className="text-sm md:text-base text-gray-600">Blog title</label>
                            <input id="blogTitle" defaultValue={ post.title } name="blogTitle" className="input border-0 outline-none rounded-lg bg-blue-100 w-full" />
                        </div>

                        {/* Blog Description */}
                        <div>
                            <label htmlFor="blogDesc" className="text-sm md:text-base text-gray-600">Blog Description</label>
                            <textarea maxLength={ characterLimitDesc } defaultValue={ post.desc } id="blogDesc" name="blogDesc" placeholder="This is a short description" className="w-full p-2 outline-none bg-blue-100 h-20 resize-none rounded-lg focus:border-2 focus:border-blue-500 focus:bg-white" onKeyDown={ handleKeyDown }/>
                            <span className="block text-right text-sm text-gray-500">{ characterLimitDesc - post.desc.length } characters left</span>
                        </div>

                        {/* Blog Tags */}
                        <div>
                            <label className="text-sm md:text-base text-gray-600">Topics - ( Helps is searching and ranking your blog post )</label>
                            
                            <div className="bg-blue-100 relative rounded-lg mt-1 px-1 py-2 pb-5 w-auto">
                                <input name="topic" placeholder="Topic" className="rounded-full mr-3 pl-2 py-1 w-full outline-none sticky left-0 top-0" onKeyDown={ handleKeyDownTag }/>
                                
                                <div className="flex flex-row flex-wrap gap-1 mt-5 justify-center">
                                    {
                                        (post.tags.length !== 0) && post.tags.map((tag, i) => <TagWithDelete key={ i } name={ tag } />)
                                    }
                                </div>
                            </div>
                            <span className="text-right inline-block w-full mt-1 text-sm text-gray-500">{ tagsLimit - post.tags.length } tags left</span>
                        </div>

                        <button disabled={ isLoading } className="btn bg-blue-700 font-medium text-white disabled:opacity-70">{ (isLoading) ? "Loading ..." : "Publish"}</button>
                    </form>
                </section>
            </section>
        </AnimationWrapper>
    )
}

export default PublishForm