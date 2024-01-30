import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const UserCard = ({ user: { personalInfo } }) => {
    const { fullName, username, profileImg } = personalInfo

    return (
        <Link to={`/profile/@${ username }`} className="flex items-center gap-3 mb-5">
            <img src={ profileImg } alt={ fullName } className="w-14 h-14 rounded-full" />
            <div>
                <h1 className="font-medium text-lg line-clamp-2">{ fullName }</h1>
                <span className="text-gray-600">@{ username }</span>
            </div>
        </Link>
    )
}

export default UserCard

UserCard.propTypes = {
    user: PropTypes.object
}