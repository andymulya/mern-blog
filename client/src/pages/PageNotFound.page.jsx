import { Link } from "react-router-dom";
import { Icon404 } from "../components/Icon.component";
import Logo from "../components/Logo.component";

export default function PageNotFound(){
    return (
        <section className="h-cover p-4 flex flex-col items-center justify-between select-none">
            <section className="flex flex-col items-center gap-5">
                <Icon404 />
                <div className="text-center leading-10">
                    <h1 className="text-xl font-medium">Page not found</h1>
                    <p className="text-gray-500">The page you are lookig for does not exists. Head back to the <Link to={'/'} className="text-blue-700 font-medium hover:underline">home page</Link></p>
                </div>
            </section>

            <section className="flex flex-col items-center">
                <Logo />
                <p className="text-sm text-gray-600">Read millions of stories around the world</p>
            </section>
        </section>
    )
}