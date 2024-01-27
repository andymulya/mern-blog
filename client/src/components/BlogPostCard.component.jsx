import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { IconLike } from './Icon.component'
import BlogPostHeaderCard from './BlogPostHeaderCard.component'

const BlogPostCard = ({ blog }) => {
    const { blogSlug: slug, title, desc, banner, tags, author:{ personalInfo }, activity: { totalLikes }, createdAt } = blog

    return (
        <Link to={`/blog/${slug}`} className="flex gap-5 items-center border-b border-gray-300 mb-10">
            <div className="w-full">
                <BlogPostHeaderCard fullName={ personalInfo.fullName } username={ personalInfo.username } profileImg={ personalInfo.profileImg } timestamp={ createdAt } />
                
                <h1 className="font-semibold text-xl md:text-2xl mb-3">{ title }</h1>
                <p className="leading-6 line-clamp-2 text-gray-600 text-sm md:text-base">{ desc }</p>
                
                <div className="flex gap-3 items-center">
                    <span className="tag my-5">{ tags[0] }</span>
                    <span className="flex justify-center gap-1">
                        <IconLike />
                        { totalLikes }
                    </span>
                </div>
            </div>

            <div className="h-28 aspect-square bg-blue-700 rounded-lg">
                <img src={ banner } className="object-cover aspect-square rounded-lg" />
            </div>
        </Link>
    )
}

export default BlogPostCard

BlogPostCard.propTypes = {
    blog: PropTypes.object
}