import PropTypes from "prop-types"
import { IconX } from "./Icon.component"
import { useDispatch, useSelector } from "react-redux"
import { setDataPost } from "../redux/slices/postSlice"

const Tag = ({ name }) => {
    const post = useSelector((state) => state.post)
    const dispatch = useDispatch()

    const handleDeleteTag = () => {
        const tags = post.tags.filter((tag) => tag !== name)
        dispatch(setDataPost({ ...post, tags }))
    }

    return (
        <div className="relative px-3 py-1 pb-2 pr-8 bg-blue-600 text-medium text-white w-auto inline rounded-full lowercase whitespace-nowrap">
            <span className="outline-none">{ name }</span>
            <button className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full ml-2 p-[3px] hover:bg-gray-200 hover:text-red-500" onClick={ handleDeleteTag }>
                <IconX style={"w-[15px] h-[15px]"} />
            </button>
        </div>
    )
}

export default Tag

Tag.propTypes = {
    name: PropTypes.string
}