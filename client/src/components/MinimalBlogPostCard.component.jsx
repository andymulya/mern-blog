import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import BlogPostHeaderCard from "./BlogPostHeaderCard.component"

const MinimalBlogPostCard = ({ blog: { blogSlug: slug, title, createdAt, author: { personalInfo } }, index }) => {
    
    return (
        <div className="flex gap-5 items-center mb-10">
            <span className="font-semibold text-5xl text-gray-200 p-5 rounded-full">{`0${ index + 1 }`}</span>
            <div>
                <BlogPostHeaderCard fullName={ personalInfo.fullName } username={ personalInfo.username } profileImg={ personalInfo.profileImg } timestamp={ createdAt } />
                <Link to={`/blog/${slug}`}>
                    <h1 className="line-clamp-2 font-semibold text-xl">{ title }</h1>
                </Link>
            </div>
        </div>
    )
}

export default MinimalBlogPostCard

MinimalBlogPostCard.propTypes = {
    blog: PropTypes.object,
    index: PropTypes.number
}