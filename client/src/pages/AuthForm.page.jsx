import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import TextInputIcon from "../components/TextInputIcon.component"
import { IconEmail, IconGoogle, IconPassword, IconUser } from "../components/Icon.component"
import Divider from "../components/Divider.component"
import { AnimationWrapper } from "../components/Animations.component"
import { getDataForm } from "../utils"
import { authUserService } from "../services/baseApi"
import { handleAuthUser } from "../redux/slices/userSlice"
import { storeInSession } from "../services/session"
import { googleAuth } from "../services/firebase/firebaseService"


export default function AuthForm(){
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const type = pathname.slice(1)
    
    const handleSubmitForm = async (e) => {
        e.preventDefault()

        const formElement = document.getElementById("form")
        const formData = getDataForm(formElement)

        try{
            setIsLoading(true)
            const user = await authUserService(pathname, formData)
            dispatch(handleAuthUser(user.data))
            storeInSession("data", JSON.stringify(user.data))
            setIsLoading(false)
            setTimeout(() => navigate('/'), 1000)
            
        }catch(err){
            toast.error(err.response.data.message)
            setIsLoading(false)
        }
    }


    const handleGoogleAuth = async (e) => {
        e.preventDefault()

        try{
            setIsLoading(true)
            const auth = await googleAuth()
            const user = await authUserService("/google-auth", { access_token: auth.user.accessToken })
            dispatch(handleAuthUser(user.data))
            storeInSession("data", JSON.stringify(user.data))
            setIsLoading(false)
            setTimeout(() => navigate('/'), 1000)
        }catch(err){
            if(err.response){
                toast.error(err.response.data.message)
            }
            setIsLoading(false)
        }
    }

    return (
        (user.token) ?
        <Navigate to={"/"} />

        :<AnimationWrapper keyValue={ type } transition={{ duration: 0.5 }}>
            <section className={`h-cover flex items-center justify-center ${(type !== "sign-in") && "mb-10"}`}>

                <form id="form" className="w-[80%] max-w-[450px]" onSubmit={(e) => handleSubmitForm(e)}>
                    <h1 className="text-center font-bold my-10 text-4xl capitalize">{ (type == "sign-in") ? "Welcome Back" : "Join us Today" }</h1>

                    {/* Input Form */}
                    <section className="flex flex-col gap-4">
                        {
                            (type != "sign-in") && 
                            <>
                                <TextInputIcon type={"text"} name={"fullName"} id={"fullName"} placeholder={"ful name"} >
                                    <IconUser />
                                </TextInputIcon>

                                <TextInputIcon type={"text"} name={"username"} id={"username"} placeholder={"username"} minLength={ 6 } maxLength={ 15 } >
                                    <IconUser />
                                </TextInputIcon>
                            </>
                        }

                        

                        <TextInputIcon type={"email"} name={"email"} id={"email"} placeholder={"email"}  >
                            <IconEmail />
                        </TextInputIcon>

                        <TextInputIcon type={"password"} name={"password"} id={"password"} placeholder={"password"} minLength={ (type != "sig-in") ? 6 : undefined} maxLength={ (type != "sign-in") ? 15 : undefined } >
                            <IconPassword />
                        </TextInputIcon>

                        <button disabled={ isLoading } className="btn bg-blue-700 text-white mt-4 uppercase w-[90%] mx-auto disabled:opacity-75">{ (!isLoading) ? type.replace("-", " ") : "Loading" }</button>
                    </section>
                    
                    <Divider title={ "or" } />

                    {/* Oauth */}
                    <section>
                        <button disabled={ isLoading } className=" btn w-[90%] gap-3 flex items-center justify-center mx-auto border border-black font-bold text-lg hover:bg-slate-100 disabled:opacity-75" onClick={(e) => handleGoogleAuth(e)}>
                            <IconGoogle w={ 30 } h={ 30 } />
                            Continue With Google
                        </button>
                    </section>
                    
                    <section className="mt-5 text-gray-700 text-lg text-center">
                        {
                            (type == "sign-in") ?
                            <span>
                                Dont&apos;nt have an account ?{" "}
                                <Link to={'/sign-up'} className="font-bold text-blue-800 hover:underline">Join us Today</Link>
                            </span>:
                            <span>
                                Already a member ?{" "}
                                <Link to={'/sign-in'} className="font-bold text-blue-800 hover:underline">Sign in here</Link>
                            </span>
                        }
                    </section>
                </form>
            </section>
        </AnimationWrapper>
    )
}