import { useParams } from "react-router-dom"
import { AnimationWrapper } from "../components/Animations.component"
import { useCallback, useEffect, useState } from "react"
import { getDetailBlog } from "../services/baseApi"
import PageNotFound from "./PageNotFound.page"

export default function BlogPage (){
    const { slug } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [detailBlog, setDetailBlog] = useState(null)

    
    const fetchDetailBlog = useCallback(async () => {
        try{
            setIsLoading(true)
            const { blog } = await getDetailBlog({ slug })
            setDetailBlog(blog)
            setIsLoading(false)
        }catch(err){
            setIsLoading(false)
            console.log(err)
        }
    }, [slug])

    useEffect(() => {
        fetchDetailBlog()
    }, [fetchDetailBlog])

    return (
        <AnimationWrapper transition={{ duration: 0.5 }}>
            <section className="h-cover px-[5vw] md:px-[7vw] lg:px-[10vw] pt-10">
                {
                    (isLoading) ?
                    <h1>Loading ...</h1> :
                    (!detailBlog) ?
                    <PageNotFound /> :
                    <h1>{ detailBlog.title }</h1>
                }
            </section>
        </AnimationWrapper>
    )
}