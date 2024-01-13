import { useState } from 'react'
import IconSearch from './IconSearch.component'
import Logo from './Logo.component'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const[searchBoxVisibility, setSearchBoxVisibility] = useState(false)

    return (
        <nav className="navbar">
            <Logo />
            
            <div className={`w-full absolute left-0 top-full mt-0.5 py-3 px-[5vw] md:relative md:w-auto md:inset-0 md:p-0 md:show ${(searchBoxVisibility ? "show" : "hide")}`}>
                <input type="text" placeholder="Search" className="w-full input rounded-full md:pl-10"/>
                
                {/* Icon Search */}
                <div className="absolute right-[8%] top-1/2 -translate-y-1/2 md:left-3 md:pointer-events-none">
                    <IconSearch />
                </div>
            </div>

            <div className="flex justify-end items-center gap-5 w-full md:w-3/4">
                {/* Button Search */}
                <button className={`hover:bg-gray-200 p-3 rounded-full md:hidden ${searchBoxVisibility && "bg-gray-200"}`} onClick={() => setSearchBoxVisibility((currentVal) => !currentVal)}>
                    <IconSearch />
                </button>

                {/* Link Write */}
                <Link to={"/editor"} className="hidden md:flex link text-gray-700 hover:text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    <span>Write</span>
                </Link>

                {/* Link Sign In */}
                <Link to={"sign-in"} className="btn bg-blue-900 text-white hover:opacity-80 w-26">
                    Sign In
                </Link>

                {/* Link Sign Out */}
                <Link to={"sign-out"} className="hidden btn bg-gray-300 text-blue-900 w-26 hover:opacity-80 md:block">
                    Sign Out
                </Link>
            </div>
        </nav>
    )
}

export default Navbar