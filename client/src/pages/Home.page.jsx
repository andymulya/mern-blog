import { useEffect, useState } from "react"
import { AnimationWrapper } from "../components/Animations.component"
import InPageNavigate from "../components/InPageNavigate.component"
import { getBlogs } from "../services/baseApi"
import toast from "react-hot-toast"
import BlogPostCard from "../components/BlogPostCard"
import MinimalBlogPostCard from "../components/MinimalBlogPostCard"
import { IconGraph } from "../components/Icon.component"


export default function Home() {
    const [latestBlogs, setLatestBlogs] = useState([])
    const [trendingBlogs, setTrendingBlogs] = useState([])
    const [pageState, setPageState] = useState("home")

    const categories = ["programming", "film making", "social media", "cooking", "tech", "finances", "travel"]

    const handleBlogByCategorie = (e) => {
        const category = e.target.innerHTML.toLowerCase()
        
        if(pageState === category) return setPageState("home")

        
        setPageState(category)
    }
    

    useEffect(() => {
        async function fetchLatestBlog(){
            try{
                const { blogs } = await getBlogs("/latest-blogs")
                setLatestBlogs(blogs)
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

        fetchTrendingBlogs()
        fetchLatestBlog()
    }, [])


    return (
        <AnimationWrapper transition={{ duration: 0.5 }}>
            <section className="h-cover py-4 px-[5vw] md:px-[7vw] lg:px-[10vw] flex gap-5">
                
                {/* InPageNavigate */}
                <section className="w-full">
                    <InPageNavigate routes={["home", "trending blogs"]} defaultHiddenRoutes={["trending blogs"]} >
                        
                        {/* Latest Blogs */}
                        {  
                            (!latestBlogs) ? 
                            <span>Loading ...</span> :
                            latestBlogs.map((blog, i) => {
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
                                    <button key={ i } className={`tag mb-2 mr-2 capitalize ${(pageState === cat) && "bg-black"}`} onClick={ handleBlogByCategorie }>
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