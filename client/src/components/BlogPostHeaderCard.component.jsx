import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { formaterDay } from "../utils"

const BlogPostHeaderCard = ({ fullName, username, profileImg, timestamp }) => {
    return (
        
        <Link to={`/profile/@${ username }`}>
            <div className="flex gap-2 items-center mb-5 text-sm md:text-base">
                    <img src={ profileImg } referrerPolicy="origin-when-cross-origin" alt={ fullName } className="w-7 rounded-full" />
                    <span className="line-clamp-1">{ `${fullName} @${username}` }</span>
                <span className="min-w-fit">{ formaterDay(timestamp) }</span>
            </div>
        </Link>
        
    )
}


export default BlogPostHeaderCard

BlogPostHeaderCard.propTypes = {
    fullName: PropTypes.string,
    username: PropTypes.string,
    profileImg: PropTypes.string,
    timestamp: PropTypes.string
}