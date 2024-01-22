import { AnimationWrapper } from "./Animations.component"
import { getDataForm } from "../utils"
import BlogBanner from "./BlogBanner.component"
import Divider from "./Divider.component"
import BlogBody from "./BlogBody.component"

const BlogEditor = () => {

    const handleTitleChange = (e) => {
        const input = e.target
        input.style.height = "auto"
        input.style.height = input.scrollHeight + "px"
    }

    const handleTitleKeyDown = (e) => {
        if(e.key === "Enter" && e.keyCode === 13) e.preventDefault()
    }

    const handleFormBlogChange = () => {
        const formBlogElement = document.getElementById("formBlog")
        const dataBlog = getDataForm(formBlogElement)
        console.log(dataBlog)
    }


    return (
        <AnimationWrapper transition={{ duration: 0.5 }}>
            <section className="mt-5 px-5 mx-auto w-full max-w-[800px]">
                <form id="formBlog" onChange={ handleFormBlogChange }>
                    <BlogBanner />
                    <textarea placeholder="Blog Title" name="title" className="leading-tight h-14 w-full outline-none resize-none font-medium text-4xl mt-10 placeholder:opacity-80" onChange={ handleTitleChange } onKeyDown={ handleTitleKeyDown }/>
                    
                    <Divider title={"content"} style={"my-0"} />

                    <BlogBody />
                </form>
            </section>
        </AnimationWrapper>
    )
}

export default BlogEditor