import { Link, useLocation } from "react-router-dom"
import TextInputIcon from "../components/TextInputIcon.component"
import { IconEmail, IconGoogle, IconPassword, IconUser } from "../components/Icon.component"
import Divider from "../components/Divider.component"
import { AnimationWrapper } from "../common/Animations"
import { getDataForm } from "../utils"
import { authUser } from "../services/baseApi"

export default function AuthForm(){
    const { pathname } = useLocation()
    const type = pathname.slice(1)

    const handleForm = async (e) => {
        e.preventDefault()

        const formElement = document.getElementById("form")
        const formData = getDataForm(formElement)

        try{
            const user = await authUser(pathname, formData)
            console.log(user.data)
        }catch(err){
            console.log(err.response.data)
        }
    }

    const handleOauth = (e) => {
        e.preventDefault()
        console.log("oauth")
    }
    
    return (
        <AnimationWrapper keyValue={ type }>
            <section className={`h-cover flex items-center justify-center ${(type !== "sign-in") && "mb-10"}`}>
                <form id="form" className="w-[80%] max-w-[450px]" onSubmit={(e) => handleForm(e)}>
                    <h1 className="text-center font-bold my-10 text-4xl capitalize">{ (type == "sign-in") ? "Welcome Back" : "Join us Today" }</h1>

                    {/* Feature Auth */}
                    <section className="flex flex-col gap-4">
                        {
                            (type != "sign-in") && 
                            <>
                                <TextInputIcon type={"text"} name={"fullName"} id={"fullName"} placeholder={"ful name"}>
                                    <IconUser />
                                </TextInputIcon>

                                <TextInputIcon type={"text"} name={"username"} id={"username"} placeholder={"username"}>
                                    <IconUser />
                                </TextInputIcon>
                            </>
                        }

                        

                        <TextInputIcon type={"email"} name={"email"} id={"email"} placeholder={"email"}>
                            <IconEmail />
                        </TextInputIcon>

                        <TextInputIcon type={"password"} name={"password"} id={"password"} placeholder={"password"}>
                            <IconPassword />
                        </TextInputIcon>

                        <button className="btn bg-blue-700 text-white mt-4 uppercase w-[90%] mx-auto">{ type.replace("-", " ") }</button>

                    </section>
                    
                    <Divider title={ "or" } />

                    {/* Feature Oauth */}
                    <section>
                        <button className=" btn w-[90%] gap-3 flex items-center justify-center mx-auto border border-black font-bold text-lg hover:bg-slate-100" onClick={(e) => handleOauth(e)}>
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