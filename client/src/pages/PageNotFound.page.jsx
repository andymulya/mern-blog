import { Link } from "react-router-dom";
import { Icon404 } from "../components/Icon.component";

export default function PageNotFound(){
    return (
        <section className="h-cover flex justify-center p-4">
            <div className="flex flex-col gap-5 items-center justify-center select-none aspect-square">
                <Icon404 />
                <div className="text-center leading-10">
                    <h1 className="text-xl font-medium">Page not found</h1>
                    <p className="text-gray-500">The page you are lookig for does not exists. Head back to the <Link to={'/'} className="text-blue-700 font-medium hover:underline">home page</Link></p>
                </div>
            </div>
        </section>
    )
}