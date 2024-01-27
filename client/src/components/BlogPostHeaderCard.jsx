import PropTypes from "prop-types"
import { formaterDay } from "../utils"

const BlogPostHeaderCard = ({ fullName, username, profileImg, timestamp }) => {
    return (
        <div className="flex gap-2 items-center mb-5 text-sm md:text-base">
            <img src={ profileImg } alt={ fullName } className="w-7 rounded-full" />
            <span className="line-clamp-1">{ `${fullName} @${username}` }</span>
            <span className="min-w-fit">{ formaterDay(timestamp) }</span>
        </div>
    )
}


export default BlogPostHeaderCard

BlogPostHeaderCard.propTypes = {
    fullName: PropTypes.string,
    username: PropTypes.string,
    profileImg: PropTypes.string,
    timestamp: PropTypes.string
}