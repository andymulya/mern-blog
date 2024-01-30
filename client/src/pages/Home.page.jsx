import { useCallback, useEffect, useState } from "react"
import { AnimationWrapper } from "../components/Animations.component"
import InPageNavigate from "../components/InPageNavigate.component"
import { getLatestBlogs, getTrendingBlogs, getBlogsByCategory, getAllTotalBlogs } from "../services/baseApi"
import toast from "react-hot-toast"
import BlogPostCard from "../components/BlogPostCard.component"
import MinimalBlogPostCard from "../components/MinimalBlogPostCard.component"
import { IconBack, IconGraph, IconHome } from "../components/Icon.component"
import NoDataMessage from "../components/NoDataMessage.component"
import BlogPaginationButton from "../components/BlogPaginationButton.component"


export default function Home() {
    const [data, setData] = useState(null)
    const [trendingBlogs, setTrendingBlogs] = useState(null)
    const [pageState, setPageState] = useState("home")
    const [page, setPage] = useState({
        latestBlogs: 1,
        blogsByCategory: 1
    })
    const categories = ["programming", "film making", "social media", "cooking", "tech", "finances", "travel"]


    const handleBlogByCategory = (e) => {
        const category = e.target.innerHTML.toLowerCase()
        
        setPage((prev) => ({ ...prev, latestBlogs: 1, blogsByCategory: 1 }))
        setData(null)
        if(pageState === category) return setPageState("home")

        setPageState(category)
    }

    const fetchLatestBlogs = useCallback(async() => {
        try{
            const data = await getLatestBlogs("/latest-blogs", { page: page.latestBlogs })
            const { totalBlogs } = await getAllTotalBlogs("/all-blogs-count")
            
            setData({
                blogs: data.blogs,
                page: data.page,
                totalBlogs
            })

            window.scrollTo(0,0)
        }catch(err){
            return toast.error(err.response.data.message)
        }
    }, [page])

    

    const fetchTrendingBlogs = useCallback(async() => {
        try{
            const { blogs } = await getTrendingBlogs("/trending-blogs")
            console.log(blogs)
            setTrendingBlogs(blogs)
        }catch(err){
            return toast.error(err.response.data.message)
        }
    }, [])

    const fetchBlogByCategory = useCallback(async() => {
        try{
            const data = await getBlogsByCategory({ tag: pageState, page: page.blogsByCategory })
            const { totalBlogs } = await getAllTotalBlogs("/all-blogs-count", { tag: pageState })
            
            setData({
                blogs: data.blogs,
                page: data.page,
                totalBlogs
            })
        }catch(err){
            return toast.error(err.response.data.message)
        }
    }, [page.blogsByCategory, pageState])


    const handlePageLatestBlogs = {
        next: () => setPage((prev) => ({ ...prev, latestBlogs: ++prev.latestBlogs })),
        prev: () => setPage((prev) => ({ ...prev, latestBlogs: --prev.latestBlogs }))
    }

    const handlePageBlogsByCategory = {
        next: () => setPage((prev) => ({ ...prev, blogsByCategory: ++prev.blogsByCategory })),
        prev: () => setPage((prev) => ({ ...prev, blogsByCategory: --prev.blogsByCategory }))
    }


    useEffect(() => {

        if(pageState === "home"){
            fetchLatestBlogs()
        }else{
            fetchBlogByCategory()
        }

        if(!trendingBlogs) fetchTrendingBlogs()

    }, [fetchBlogByCategory, fetchLatestBlogs, fetchTrendingBlogs, pageState, trendingBlogs])

    

    return (
        <AnimationWrapper transition={{ duration: 0.5 }}>
            <section className="h-cover py-4 px-[5vw] md:px-[7vw] lg:px-[10vw] flex gap-5">
                
                {/* InPageNavigate */}
                <section className="w-full">
                    <InPageNavigate routes={[pageState, "trending blogs"]} defaultHiddenRoutes={["trending blogs"]} >
                        
                        {/* Latest Blogs */}
                        <>  
                            {  
                                (!data) ? 
                                <span>Loading ...</span> :
                                (data.blogs?.length) ?
                                data.blogs?.map((blog, i) => {
                                    return (
                                        <AnimationWrapper keyValue={ String(data.page) } key={ i } transition={{ duration: 0.5, delay: i*.1 }} >
                                            <BlogPostCard blog={ blog } />
                                        </AnimationWrapper>
                                    )
                                }): <NoDataMessage message={"No blogs published"} />
                            }

                            <BlogPaginationButton dataBlogs={ data } handlePagination={ (pageState === "home") ? handlePageLatestBlogs : handlePageBlogsByCategory } />
                        </>

                        {/* Ui trending blogs for mobile */}
                        <>
                            {
                                (!trendingBlogs) ? 
                                <span>Loading ...</span> :
                                (trendingBlogs.length) ?
                                trendingBlogs.map((blog, i) => {
                                    return (
                                        <AnimationWrapper key={ i } transition={{ duration: 0.5, delay: i*.1 }} >
                                            <div className="md:hidden">
                                                <MinimalBlogPostCard blog={ blog } index={ i } />
                                            </div>
                                        </AnimationWrapper>
                                    )
                                }): <NoDataMessage message={"No trending blogs"} />
                            }

                            {/* Back to home, when ui trending blogs for mobile is hidden */}
                            <section className="flex flex-col items-center mx-auto max-md:hidden">
                                <IconHome />
                                <div className="flex items-center font-medium">
                                    <IconBack />
                                    <span>Back to Home</span>
                                </div>
                            </section>
                        </>

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
                            (trendingBlogs.length) ?
                            trendingBlogs.map((blog, i) => {
                                return (
                                    <AnimationWrapper key={ i } transition={{ duration: 0.5, delay: i*.1 }} >
                                        <MinimalBlogPostCard blog={ blog } index={ i } />
                                    </AnimationWrapper>
                                )
                            }) : <NoDataMessage message={"No trending blog"} />
                        }
                    </div>
                </section>
            </section>
        </AnimationWrapper>
    )
}