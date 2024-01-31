import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getUserProfile } from "../services/baseApi"
import PageNotFound from "./PageNotFound.page"
import { AnimationWrapper } from "../components/Animations.component"
import { IconPencil } from "../components/Icon.component"
import AboutUser from "../components/AboutUser.component"
import InPageNavigate from "../components/InPageNavigate.component"

const userDataStructure = {
    personalInfo: {
        fullName: "",
        username: "",
        profileImg: "",
        bio: "",
    },
    accountInfo: {
        totalPost: 0,
        totalReads: 0
    },
    socialLinks: {},
    createdAt: ""
}

export default function Profile() {
    const { id } = useParams()
    const [user, setUser] = useState(userDataStructure)
    const [error, setError] = useState({})
    const { personalInfo, accountInfo, socialLinks, createdAt } = user
    const [isLoading, setIsLoading] = useState(false)
    const data = useSelector((state) => state.user)
    const username = id.split('@')[1]


    const fetchUserProfile = useCallback(async () => {
        try{
            const { user } = await getUserProfile({ username })
            setUser(user)
            setIsLoading(false)
        }catch(err){
            setIsLoading(false)
            setError(err.response.data)
        }
    }, [username])

    useEffect(() => {

        setUser(userDataStructure)
        setIsLoading(true)
        fetchUserProfile()
        
    }, [fetchUserProfile])



    return(
        <AnimationWrapper keyValue={ username } transition={{ duration: 0.5 }}>
            {
                (error) && (error.statusCode === 404) ?
                <PageNotFound /> :
                (isLoading) ?
                <h1>Loading ...</h1> :
                <section className="h-cover pt-10 gap-12 flex flex-col max-md:items-center md:flex-row-reverse">
                    <section className="flex flex-col max-md:items-center gap-4 min-w-[250px]">
                        <div className="aspect-square h-[12rem] w-[12rem] md:h-[10rem] md:w-[10rem] rounded-full">
                            <img src={ personalInfo.profileImg } alt={ personalInfo.fullName } className="rounded-full object-cover" />
                        </div>

                        <div className="flex items-center gap-2 mt-4">
                            <h1 className="text-xl font-medium">@{ personalInfo.username }</h1>
                            {
                                (data.user?.token) && (data.user?.username === username) && 
                                <Link to={"/edit-profile"} className="hover:bg-blue-700 hover:p-[3px] rounded-full hover:text-white duration-300">
                                    <IconPencil />
                                </Link>
                            }
                        </div>

                        <span className="text-gray-600 capitalize">{ personalInfo.fullName }</span>
                        <span className="text-gray-600">{ accountInfo.totalPost.toLocaleString() } Blogs - { accountInfo.totalReads.toLocaleString() } Reads</span>
                        <AboutUser bio={ personalInfo.bio } socialLinks={ socialLinks } createdAt={ createdAt } />
                    </section>

                    <section className="w-full">
                        
                    </section>
                </section>
            }
        </AnimationWrapper>
    )
}