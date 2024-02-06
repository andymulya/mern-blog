import { useDispatch, useSelector } from 'react-redux'
import { setDataPost } from '../redux/slices/postSlice'
import { useCallback, useEffect, useRef } from 'react'


const BlogTitle = () => {
    const post = useSelector((state) => state.post)
    const titleRef = useRef()
    const dispatch = useDispatch()

    const handleTitleChange = useCallback(({ value }) => dispatch(setDataPost({ ...post, title: value })), [dispatch, post])
    

    const handleTitleKeyDown = (e) => {
        if(e.key === "Enter" && e.keyCode === 13) e.preventDefault()
    }

    useEffect(() => {
        titleRef.current.style.height = "auto"
        titleRef.current.style.height = titleRef.current.scrollHeight + "px"

    }, [handleTitleChange])

    return <textarea ref={ titleRef } value={ post.title } placeholder="Blog Title" name="title" className="leading-tight h-14 w-full outline-none resize-none text-4xl max-md:text-3xl font-medium mt-10 placeholder:opacity-80" onChange={ (e) => handleTitleChange(e.target) } onKeyDown={ handleTitleKeyDown }/>
}

export default BlogTitle