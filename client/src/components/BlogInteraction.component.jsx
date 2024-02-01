import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"


const BlogInteraction = ({ title, slug, blogActivity: { totalLikes, totalComments }, username }) => {
    const { user } = useSelector((state) => state.user)

    return(
        <div className="flex items-center justify-between mt-5 border-y border-gray-300 mb-5 py-2 px-3">
            <div className="flex items-center gap-5">
                <ButtonInteraction activity={ totalLikes }>
                    <i className="fi fi-rs-heart hover:text-red-500" />
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


const ButtonInteraction = ({ activity, children }) => {
    return (
        <div className="flex items-center gap-2">
            <button className="flexjustify-center text-xl w-10 h-10 bg-gray-100 rounded-full">
                { children }
            </button>
            <span>{ activity }</span>
        </div>
    )
}

ButtonInteraction.propTypes = {
    activity: PropTypes.number,
    children: PropTypes.object
}

