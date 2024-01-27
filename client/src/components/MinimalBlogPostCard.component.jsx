import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import BlogPostHeaderCard from "./BlogPostHeaderCard.component"

const MinimalBlogPostCard = ({ blog: { blogSLug: slug, title, createdAt, author: { personalInfo } }, index }) => {
    
    return (
        <Link to={`/blog/${slug}`} className="flex gap-5 items-center mb-10">
            <span className="font-semibold text-5xl text-gray-200 p-5 rounded-full">{`0${ index + 1 }`}</span>
            <div>
                <BlogPostHeaderCard fullName={ personalInfo.fullName } username={ personalInfo.username } profileImg={ personalInfo.profileImg } timestamp={ createdAt } />
                <h1 className="line-clamp-2 font-semibold text-xl">{ title }</h1>
            </div>
        </Link>
    )
}

export default MinimalBlogPostCard

MinimalBlogPostCard.propTypes = {
    blog: PropTypes.object,
    index: PropTypes.number
}