import { useEffect, useState } from "react"
import { AnimationWrapper } from "../components/Animations.component"
import InPageNavigate from "../components/InPageNavigate.component"
import { getBlogs, getBlogsByCategory } from "../services/baseApi"
import toast from "react-hot-toast"
import BlogPostCard from "../components/BlogPostCard"
import MinimalBlogPostCard from "../components/MinimalBlogPostCard"
import { IconGraph } from "../components/Icon.component"


export default function Home() {
    const [blogs, setBlogs] = useState([])
    const [trendingBlogs, setTrendingBlogs] = useState([])
    const [pageState, setPageState] = useState("home")

    const categories = ["programming", "film making", "social media", "cooking", "tech", "finances", "travel"]

    const handleBlogByCategory = (e) => {
        const category = e.target.innerHTML.toLowerCase()
        
        setBlogs(null)
        if(pageState === category) return setPageState("home")

        setPageState(category)
    }
    

    useEffect(() => {
        async function fetchLatestBlogs(){
            try{
                const { blogs } = await getBlogs("/latest-blogs")
                setBlogs(blogs)
            }catch(err){
                return toast.error(err.response.data.message)
            }
        }
    
        async function fetchTrendingBlogs(){
            try{
                const { blogs } = await getBlogs("/trending-blogs")
                setTrendingBlogs(blogs)
            }catch(err){
                return toast.error(err.response.data.message)
            }
        }

        async function fetchBlogByCategory(){
            try{
                const { blogs } = await getBlogsByCategory({ tag: pageState })
                setBlogs(blogs)
            }catch(err){
                return toast.error(err.response.data.message)
            }
        }

        if(pageState === "home") fetchLatestBlogs()
        fetchBlogByCategory()

        if(!trendingBlogs) fetchTrendingBlogs()
    }, [pageState, trendingBlogs])


    return (
        <AnimationWrapper transition={{ duration: 0.5 }}>
            <section className="h-cover py-4 px-[5vw] md:px-[7vw] lg:px-[10vw] flex gap-5">
                
                {/* InPageNavigate */}
                <section className="w-full">
                    <InPageNavigate routes={[pageState, "trending blogs"]} defaultHiddenRoutes={["trending blogs"]} >
                        
                        {/* Latest Blogs */}
                        {  
                            (!blogs) ? 
                            <span>Loading ...</span> :
                            blogs.map((blog, i) => {
                                return (
                                    <AnimationWrapper key={ i } transition={{ duration: 0.5, delay: i*.1 }} >
                                        <BlogPostCard blog={ blog } />
                                    </AnimationWrapper>
                                )
                            })
                        }

                        {/* Trending Blogs */}
                        {
                            (!trendingBlogs) ? 
                            <span>Loading ...</span> :
                            trendingBlogs.map((blog, i) => {
                                return (
                                    <AnimationWrapper key={ i } transition={{ duration: 0.5, delay: i*.1 }} >
                                        <MinimalBlogPostCard blog={ blog } index={ i } />
                                    </AnimationWrapper>
                                )
                            })
                        }
                        <div>Trending blogs</div>
                    </InPageNavigate>
                </section>
                
                
                {/* Aside */}
                {/* filters dan trending blogs */}
                <section className=" flex flex-col gap-10 min-w-[40%] lg:min-w-[400px] max-w-min max-md:hidden border-l border-gray-300 pl-8 pt-3">
                    <div>
                        <h1 className="text-xl font-medium mb-8">Stories from all interests</h1>
                        {
                            categories.map((cat, i) =>{
                                return (
                                    <button key={ i } className={`tag mb-2 mr-2 capitalize ${(pageState === cat) && "bg-black"}`} onClick={ handleBlogByCategory }>
                                        { cat }
                                    </button>
                                )
                            })
                        }
                    </div>

                    <div>
                        <div className="flex items-center gap-3 mb-10">
                            <h1 className="text-xl font-medium">Trending</h1>
                            <IconGraph />
                        </div>
                        {
                            (!trendingBlogs) ? 
                            <span>Loading ...</span> :
                            trendingBlogs.map((blog, i) => {
                                return (
                                    <AnimationWrapper key={ i } transition={{ duration: 0.5, delay: i*.1 }} >
                                        <MinimalBlogPostCard blog={ blog } index={ i } />
                                    </AnimationWrapper>
                                )
                            })
                        }
                    </div>
                </section>
            </section>
        </AnimationWrapper>
    )
}