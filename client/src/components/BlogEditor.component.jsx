import { AnimationWrapper } from "../common/Animations"
import BlogBanner from "./BlogBanner"

const BlogEditor = () => {

    const handleTitleChange = (e) => {
        const input = e.target
        input.style.height = "auto"
        input.style.height = input.scrollHeight + "px"
    }

    const handleTitleKeyDown = (e) => {
        if(e.key === "Enter" && e.keyCode === 13) e.preventDefault()
    }

    return (
        <AnimationWrapper transition={{ duration: 0.5 }}>
            <section className="mt-5 px-5 mx-auto w-full max-w-[800px]">
                <BlogBanner />
                <textarea placeholder="Blog Title" className="leading-tight w-full outline-none resize-none font-medium text-4xl mt-10 placeholder:opacity-80" onChange={ handleTitleChange } onKeyDown={ handleTitleKeyDown }/>
            </section>
        </AnimationWrapper>
    )
}

export default BlogEditor