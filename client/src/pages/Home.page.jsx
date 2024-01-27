import { useEffect, useState } from "react"
import { AnimationWrapper } from "../components/Animations.component"
import InPageNavigate from "../components/InPageNavigate.component"
import { getBlogs } from "../services/baseApi"
import toast from "react-hot-toast"
import BlogPostCard from "../components/BlogPostCard"


export default function Home() {
    const [latestBlogs, setLatestBlogs] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchLatestBlog(){
            try{
                setIsLoading(true)
                const { blogs } = await getBlogs()
                setLatestBlogs(blogs)
                setIsLoading(false)
            }catch(err){
                return toast.error(err.response.data.message)
            }
        }
        fetchLatestBlog()
    }, [])


    return (
        <AnimationWrapper transition={{ duration: 0.5 }}>
            <section className="h-cover py-4 px-[5vw] md:px-[7vw] lg:px-[10vw]">
                <div className="w-full">
                    <InPageNavigate routes={["home", "trending blogs"]} defaultHiddenRoutes={["trending blogs"]} >
                        
                        {
                            (isLoading) ? 
                            <span>Loading ...</span> :
                            (!latestBlogs) ? 
                            <span>Not Found</span> :
                            latestBlogs.map((blog, i) => {
                                return (
                                    <AnimationWrapper key={ i } transition={{ duration: 0.5, delay: i*.1 }} >
                                        <BlogPostCard blog={ blog } />
                                    </AnimationWrapper>
                                )
                            })
                        }
                        <div>Trending Blog</div>
                    </InPageNavigate>
                </div>
            </section>
        </AnimationWrapper>
    )
}