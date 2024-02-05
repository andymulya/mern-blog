import { Link, useParams } from "react-router-dom"
import { AnimationWrapper } from "../components/Animations.component"
import { useCallback, useEffect, useState } from "react"
import { getDetailBlog, searchBlogs } from "../services/baseApi"
import PageNotFound from "./PageNotFound.page"
import { formaterDay } from "../utils"
import BlogInteraction from "../components/BlogInteraction.component"
import BlogPostCard from "../components/BlogPostCard.component"
import BlogDetailBody from "../components/BlogDetailBody.component"


const dataBlogStructure = {
    activity: {},
    author: { personalInfo: {} },
    banner: "",
    title: "",
    createdAt: "",
    desc: "",
}


export default function BlogPage (){
    const { slug } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [detailBlog, setDetailBlog] = useState(dataBlogStructure)
    const [similarBlog, setSimilarBlog] = useState([])
    const [error, setError] = useState(null)

    const { banner, title, blogSlug, activity, author: { personalInfo }, createdAt } = detailBlog

    
    const fetchDetailBlog = useCallback(async () => {
        try{
            setIsLoading(true)
            const { blog } = await getDetailBlog({ slug })
            const similarBlog = await searchBlogs({ tag: blog.tags[0], eleminateBlog: blog.blogSlug, limit: 6 })
            setDetailBlog(blog)
            setSimilarBlog(similarBlog.blogs)
            setIsLoading(false)
        }catch(err){
            setIsLoading(false)
            setError(err.response.data)
        }
    }, [slug])


    useEffect(() => {
        fetchDetailBlog()
    }, [fetchDetailBlog])

    console.log(detailBlog)

    return (
        <AnimationWrapper keyValue={ detailBlog.title } transition={{ duration: 0.5 }}>
            {
                (isLoading) ?
                <h1>Loading ...</h1> :
                (error?.statusCode === 404) ?
                <PageNotFound /> :
                <article className="h-cover mx-auto py-10 max-w-[800px] max-lg:px-[5vw]">
                    <img src={ banner } className="aspect-video mx-auto" />

                    <section className="mt-12">
                        <h1 className="font-bold text-3xl md:text-4xl">{ title }</h1>

                        <div className="mt-12 flex gap-5">
                            <img src={ personalInfo.profileImg } className="rounded-full w-12 h-12" />
                            
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 w-full">
                                <Link to={`/profile/@${ personalInfo.username }`}>
                                    <h1 className="font-medium">{ personalInfo.fullName }</h1>
                                    <span className="text-sm text-gray-600">@{ personalInfo.username }</span>
                                </Link>
                                <span className="text-sm text-gray-600" >Published on { formaterDay(createdAt) }</span>
                            </div>
                        </div>

                        <BlogInteraction title={ title } slug={ blogSlug } blogActivity={ activity } username={ personalInfo.username } />
                        
                        {
                            (detailBlog.body) && detailBlog.body.map((block, i) => {
                                return (
                                    <BlogDetailBody key={ i } block={ block } />
                                )
                            })
                        }

                        <BlogInteraction title={ title } slug={ blogSlug } blogActivity={ activity } username={ personalInfo.username } />

                        {
                            (similarBlog.length) ? 
                            <section className="mt-10">
                                <h1 className="text-xl font-medium mb-10">Similar Blogs</h1>
                                {
                                    
                                    similarBlog.map((blog, i) => {
                                        return (
                                            <AnimationWrapper key={ i } transition={{ duration: 0.5, delay: i*.1 }} >
                                                <BlogPostCard blog={ blog } />
                                            </AnimationWrapper>
                                        )
                                    })
                                }
                            </section> : ""
                        }
                        
                    </section>
                </article>
            }
        </AnimationWrapper>
    )
}