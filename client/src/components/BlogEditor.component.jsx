import PropTypes from 'prop-types'
import { AnimationWrapper } from "./Animations.component"
import BlogBanner from "./BlogBanner.component"
import Divider from "./Divider.component"
import BlogBody from "./BlogBody.component"
import { useDispatch, useSelector } from 'react-redux'
import { setDataPost } from '../redux/slices/postSlice'

const BlogEditor = ({ handleBlogBody }) => {
    const post = useSelector((state) => state.post)
    const dispatch = useDispatch()

    const handleTitleChange = (e) => {
        const input = e.target
        input.style.height = "auto"
        input.style.height = input.scrollHeight + "px"

        dispatch(setDataPost({ ...post, title: input.value }))
    }
    

    const handleTitleKeyDown = (e) => {
        if(e.key === "Enter" && e.keyCode === 13) e.preventDefault()
    }


    return (
        <AnimationWrapper transition={{ duration: 0.5 }}>
            <section className="mt-5 px-5 mx-auto w-full max-w-[800px]">
                <BlogBanner />
                <textarea placeholder="Blog Title" name="title" className="leading-tight h-14 w-full outline-none resize-none font-medium text-4xl mt-10 placeholder:opacity-80" onChange={ handleTitleChange } onKeyDown={ handleTitleKeyDown }/>
                
                <Divider title={"content"} style={"my-0"} />

                <BlogBody handleInitialize={ handleBlogBody } />
            </section>
        </AnimationWrapper>
    )
}

BlogEditor.propTypes = {
    handleBlogBody: PropTypes.func
}

export default BlogEditor