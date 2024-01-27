import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formaterDay } from '../utils'
import { IconLike } from './Icon.component'

const BlogPostCard = ({ blog }) => {
    const { blogSlug: slug, title, desc, banner, tags, author:{ personalInfo }, activity: { totalLikes }, createdAt } = blog

    return (
        <Link className="flex gap-5 items-center border-b border-gray-300 mb-10">
            <div className="w-full">
                <div className="flex gap-2 items-center mb-5 text-sm md:text-base">
                    <img src={ personalInfo.profileImg } alt={ personalInfo.fullName } className="w-7 rounded-full" />
                    <p className="line-clamp-1">{ `${personalInfo.fullName} @${personalInfo.username}` }</p>
                    <p className="min-w-fit">{ formaterDay(createdAt) }</p>
                </div>
                
                <h1 className="font-semibold text-lg md:text-xl mb-3">{ title }</h1>
                <p className="leading-6 line-clamp-2 text-gray-600 text-sm md:text-base">{ desc }</p>
                
                <div className="flex gap-3 items-center">
                    <span className="bg-blue-700 my-5 text-white rounded-full py-1 px-3 font-medium">{ tags[0] }</span>
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