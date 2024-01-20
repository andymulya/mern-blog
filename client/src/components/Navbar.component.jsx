import { useState } from 'react'
import { IconNotify, IconSearch, IconWrite } from './Icon.component'
import Logo from './Logo.component'
import { Link, useLocation } from 'react-router-dom'
import Search from './Search.component'
import { useSelector } from 'react-redux'
import UserNavigationPanel from './UserNavigationPanel.component'

const Navbar = () => {
    const[searchBoxVisibility, setSearchBoxVisibility] = useState(false)
    const[isUserNavPanel, setIsUserNavPanel] = useState(false)
    const { pathname } = useLocation()
    const { user } = useSelector((state) => state.user)
    console.log(pathname)
    return (
        <nav className="navbar">
            <Logo />
            {
                (pathname != "/sign-in" && pathname != "/sign-up") && <Search isVisibility={ searchBoxVisibility }/>
            }

            <div className="flex justify-end items-center gap-5 w-full md:w-3/4">
                {
                    (pathname != "/sign-in" && pathname != "/sign-up") && 
                    <button className={`hover:bg-gray-200 p-3 rounded-full md:hidden ${searchBoxVisibility && "bg-gray-200"}`} onClick={() => setSearchBoxVisibility((currentVal) => !currentVal)} >
                        <IconSearch />
                    </button>
                }

                {/* Link Write */}
                {
                    (user.token) &&
                    <Link to={"/editor"} className="hidden md:flex link text-gray-700 hover:text-blue-700">
                        <IconWrite />
                        <span>Write</span>
                    </Link>
                }
                
                {
                    (user.token) ?
                    <section className="flex items-center gap-3">
                        {/* Button notify */}
                        <Link className="hover:bg-gray-200 link rounded-full p-2 hidden md:block">
                               <IconNotify />
                        </Link>

                        {/* Image profile */}
                        <button className="w-11 h-11 rounded-full bg-blue-500 p-[2px]" onClick={() => setIsUserNavPanel((currentVal) => !currentVal)} onBlur={() => setTimeout(() => setIsUserNavPanel(false), 200) }>
                            <img src={ user.profileImg } className="rounded-full object-cover" />
                        </button>
                        {
                            (isUserNavPanel) && <UserNavigationPanel />
                        }
                    </section>:

                    <section className="flex gap-3">
                        {/* Link Sign In */}
                        <Link to={"sign-in"} className="btn bg-blue-900 text-white w-26">
                            Sign In
                        </Link>
    
                        {/* Link Sign Up */}
                        <Link to={"sign-up"} className="hidden btn bg-gray-300 text-blue-900 w-26 md:block">
                            Sign up
                        </Link>
                    </section>
                }
            </div>
        </nav>
    )
}

export default Navbar