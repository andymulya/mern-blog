import PropTypes from 'prop-types'
import { AnimationWrapper } from "./Animations.component"
import BlogBanner from "./BlogBanner.component"
import Divider from "./Divider.component"
import BlogBody from "./BlogBody.component"
import BlogTitle from './BlogTitle.component'


const BlogEditor = ({ handleBlogBody }) => {

    return (
        <AnimationWrapper transition={{ duration: 0.5 }}>
            <section className="mt-5 px-5 mx-auto w-full max-w-[800px]">
                <BlogBanner />
                
                <BlogTitle />

                <Divider title={"content"} style={"my-0"} />

                <BlogBody handleInitialize={ handleBlogBody } />
            </section>
        </AnimationWrapper>
    )
}

BlogEditor.propTypes = {
    handleBlogBody: PropTypes.func
}

export default BlogEditor