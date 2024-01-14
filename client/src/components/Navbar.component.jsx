import { useState } from 'react'
import { IconSearch, IconWrite } from './Icon.component'
import Logo from './Logo.component'
import { Link } from 'react-router-dom'
import Search from './Search.component'

const Navbar = () => {
    const[searchBoxVisibility, setSearchBoxVisibility] = useState(false)

    return (
        <nav className="navbar">
            <Logo />
            
            <Search isVisibility={ searchBoxVisibility }/>

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