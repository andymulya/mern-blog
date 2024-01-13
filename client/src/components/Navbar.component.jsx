import { useState } from 'react'
import IconSearch from './IconSearch'
import Logo from './Logo.component'

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

            <div className="flex justify-end w-full md:w-auto">
                {/* Button Search */}
                <button className={`hover:bg-gray-200 p-3 rounded-full md:hidden ${searchBoxVisibility && "bg-gray-200"}`} onClick={() => setSearchBoxVisibility((currentVal) => !currentVal)}>
                    <IconSearch />
                </button>

                {/* Button Write */}
            </div>
        </nav>
    )
}

export default Navbar