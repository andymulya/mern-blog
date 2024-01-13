import { useState } from 'react'
import { IconSearch, IconWrite } from './Icon.component'
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
                    <IconWrite />
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