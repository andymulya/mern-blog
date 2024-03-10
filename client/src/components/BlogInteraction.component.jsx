import { useSelector } from "react-redux"
import toast from 'react-hot-toast'
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"


const BlogInteraction = ({ title, slug, blogActivity: { totalLikes, totalComments }, username }) => {
    const { user } = useSelector((state) => state.user)
    const [totalLikesState, setTotalLikesState] = useState(totalLikes)

    const handleLike = () => {
        if(!user.username) return toast.error("Please login to like this blog")
        console.log("liked")
        setTotalLikesState(prev => ++prev)
    }

    useEffect(() => {
        console.log(totalLikesState)
    }, [totalLikesState])

    return(
        <div className="flex items-center justify-between mt-5 border-y border-gray-300 mb-5 py-2 px-3">
            <div className="flex items-center gap-5">
                <ButtonInteraction activity={ totalLikesState } handleOnClick={ handleLike } style={"hover:text-red-500 hover:bg-red-500/20"} >
                    <i className="fi fi-rs-heart"/>
                </ButtonInteraction>

                <ButtonInteraction activity={ totalComments }>
                    <i className="fi fi-rs-comment-dots" />
                </ButtonInteraction>
            </div>

            <div className="flex gap-5 text-xl">
                {
                    (user.username === username) &&
                    <Link to={`/editor/${ slug }`}>
                        <i className="fi fi-rr-edit hover:text-blue-700" />
                    </Link>
                }
                <Link to={`https://twitter.com/intent/tweet?text=Read ${ title }&url=${ location.href }`}>
                    <i className="fi fi-brands-twitter hover:text-blue-500" />
                </Link>
            </div>
        </div>
    )
}

export default BlogInteraction

BlogInteraction.propTypes = {
    blogActivity: PropTypes.object,
    title: PropTypes.string,
    username: PropTypes.string,
    slug: PropTypes.string
}


const ButtonInteraction = ({ activity, children, style, handleOnClick = () => {} }) => {
    return (
        <div className="flex items-center gap-2">
            <button className={`flex justify-center pt-[6px] pb-[3px] px-[10px] items-center text-lg bg-gray-100 rounded-full ${ style }`} onClick={ handleOnClick }>
                { children }
            </button>
            <span>{ activity }</span>
        </div>
    )
}

ButtonInteraction.propTypes = {
    activity: PropTypes.number,
    children: PropTypes.object,
    style: PropTypes.string,
    handleOnClick: PropTypes.func,
}

