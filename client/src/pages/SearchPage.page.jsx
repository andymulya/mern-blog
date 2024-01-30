import { useParams } from "react-router-dom"
import InPageNavigate from "../components/InPageNavigate.component"
import { useCallback, useEffect, useState } from "react"
import { AnimationWrapper } from "../components/Animations.component"
import BlogPostCard from "../components/BlogPostCard.component"
import BlogPaginationButton from "../components/BlogPaginationButton.component"
import NoDataMessage from "../components/NoDataMessage.component"
import { IconBack, IconHome, IconUser } from "../components/Icon.component"
import { getAllTotalBlogs, searchBlogs, searchUsers } from "../services/baseApi"
import UserCard from "../components/UserCard.component"


export default function SearchPage(){
    const [dataBlogs, setDataBlogs] = useState(null)
    const [page, setPage] = useState(1)
    const [dataUsers, setDataUsers] = useState(null)
    const { query } = useParams()

    const fecthBlogsBySearchQuery = useCallback(async () => {
        try{
            const data = await searchBlogs({ query, page: page })
            const { totalBlogs } = await getAllTotalBlogs("/all-blogs-count", { query })
            
            setDataBlogs({
                blogs: data.blogs,
                page: data.page,
                totalBlogs
            })
        }catch(err){
            if(err) throw err
        }
    },[page, query])

    const fecthSearchUsersByQuery = useCallback(async () => {
        try{
            const { users } = await searchUsers({ query })
            setDataUsers({ users })
        }catch(err){
            if(err) throw err
        }
    },[query])


    const handlePageSearchBlogs = {
        next: () => setPage((prev) => ++prev),
        prev: () => setPage((prev) => --prev)
    }

    useEffect(() => {
        fecthBlogsBySearchQuery()

        fecthSearchUsersByQuery()
    }, [fecthBlogsBySearchQuery, fecthSearchUsersByQuery])



    return (
        <section className="h-cover py-4 px-[5vw] md:px-[7vw] lg:px-[10vw] flex gap-5">
            <section className="w-full">
                <InPageNavigate routes={[`Search Results For "${ query }"`, "Account Matched"]} defaultHiddenRoutes={["Account Matched"]}>
                    {/* Search Blogs from query */}
                    <section>  
                        {  
                            (!dataBlogs) ? 
                            <span>Loading ...</span> :
                            (dataBlogs.blogs?.length) ?
                            dataBlogs.blogs?.map((blog, i) => {
                                return (
                                    <AnimationWrapper keyValue={ String(dataBlogs.page) } key={ i } transition={{ duration: 0.5, delay: i*.1 }} >
                                        <BlogPostCard blog={ blog } />
                                    </AnimationWrapper>
                                )
                            }): <NoDataMessage message={"No blogs published"} />
                        }

                        <BlogPaginationButton dataBlogs={ dataBlogs } handlePagination={ handlePageSearchBlogs } />
                    </section>

                    {/* Ui Account Matched blogs for mobile */}
                    <section>
                        {
                            (!dataUsers) ? 
                            <span>Loading ...</span> :
                            (dataUsers.users?.length) ?
                            dataUsers.users?.map((user, i) => {
                                return (
                                    <AnimationWrapper key={ i } transition={{ duration: 0.5, delay: i*.1 }} >
                                        <div className="md:hidden">
                                            <UserCard user={ user } />
                                        </div>
                                    </AnimationWrapper>
                                )
                            }): <NoDataMessage message={"No user found"} />
                        }

                        {/* Back to home, when ui trending blogs for mobile is hidden */}
                        <div className="flex flex-col items-center mx-auto max-md:hidden">
                            <IconHome />
                            <div className="flex items-center font-medium">
                                <IconBack />
                                <span>Back to Results</span>
                            </div>
                        </div>
                    </section>
                </InPageNavigate>
            </section>

            <section className="flex flex-col min-w-[40%] lg:min-w-[300px] max-w-min max-md:hidden border-l border-gray-300 pl-8 pt-3">
                <section>
                    <div className="flex items-center gap-3 mb-10">
                        <h1 className="text-lg font-medium text-nowrap">Users releated to search</h1>
                        <IconUser />
                    </div>
                    {
                        (!dataUsers) ? 
                        <span>Loading ...</span> :
                        (dataUsers.users.length) ?
                        dataUsers.users.map((user, i) => {
                            return (
                                <AnimationWrapper key={ i } transition={{ duration: 0.5, delay: i*.1 }} >
                                    <UserCard user={ user } />
                                </AnimationWrapper>
                            )
                        }) : <NoDataMessage message={"No user found"} />
                    }
                </section>
            </section>
        </section>
    )
}