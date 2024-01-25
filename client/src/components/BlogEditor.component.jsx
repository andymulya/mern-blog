import PropTypes from 'prop-types'
import { AnimationWrapper } from "./Animations.component"
import BlogBanner from "./BlogBanner.component"
import Divider from "./Divider.component"
import BlogBody from "./BlogBody.component"
import BlogTitle from './BlogTitle.component'


const BlogEditor = ({ handleInitialize }) => {

    return (
        <AnimationWrapper transition={{ duration: 0.5 }}>
            <section className="mt-5 px-5 mx-auto w-full max-w-[750px]">
                <BlogBanner />
                
                <BlogTitle />

                <Divider title={"content"} style={"my-0"} />

                <BlogBody handleInitialize={ handleInitialize } />
            </section>
        </AnimationWrapper>
    )
}

BlogEditor.propTypes = {
    handleInitialize: PropTypes.func
}

export default BlogEditor