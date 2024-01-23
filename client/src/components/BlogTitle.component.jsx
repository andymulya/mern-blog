import { useDispatch, useSelector } from 'react-redux'
import { setDataPost } from '../redux/slices/postSlice'


const BlogTitle = () => {
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

    return <textarea value={ post.title } placeholder="Blog Title" name="title" className="leading-tight h-14 w-full outline-none resize-none text-4xl max-md:text-3xl font-bold mt-10 placeholder:opacity-80" onChange={ handleTitleChange } onKeyDown={ handleTitleKeyDown }/>
}

export default BlogTitle