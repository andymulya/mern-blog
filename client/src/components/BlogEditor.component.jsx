import { AnimationWrapper } from "../common/Animations"
import BlogBanner from "./BlogBanner"

const BlogEditor = () => {
    return (
        <AnimationWrapper transition={{ duration: 0.5 }}>
            <section className="mt-5 px-5">
                <BlogBanner />
            </section>
        </AnimationWrapper>
    )
}

export default BlogEditor