import PropTypes from "prop-types"

const NoDataMessage = ({ message }) => {
    return (
        <div className="text-center bg-gray-200 rounded-full w-full p-3 font-medium mt-4">
            <p>{ message }</p>
        </div>
    )
}

export default NoDataMessage

NoDataMessage.propTypes = {
    message: PropTypes.string
}