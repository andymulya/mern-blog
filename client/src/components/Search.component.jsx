import PropTypes from 'prop-types';
import { IconSearch } from './Icon.component'
import { useNavigate } from 'react-router-dom';

const Search = ({ isVisibility }) => {
    const navigate = useNavigate()


    const handleKeyDownSearch = (e) => {
        const query = e.target.value.toLowerCase()

        if(e.code === "Enter" && e.keyCode === 13 && query){
            navigate(`search/${query}`)
        }

    }

    return (
        <div className={`w-full absolute left-0 top-full mt-0.5 py-3 px-[5vw] md:relative md:w-auto md:inset-0 md:p-0 md:show ${(isVisibility ? "show" : "hide")}`}>
            <input type="text" placeholder="Search" className="w-full input rounded-full md:pl-10" onKeyDown={ handleKeyDownSearch }/>
            
            {/* Icon Search */}
            <div className="absolute right-[8%] top-1/2 -translate-y-1/2 md:left-3 md:pointer-events-none text-blue-800">
                <IconSearch />
            </div>
        </div>
    )
}

Search.propTypes = {
    isVisibility: PropTypes.bool
}

export default Search