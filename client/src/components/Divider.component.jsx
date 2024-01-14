import PropTypes from 'prop-types'

const Devider = ({ title }) => {
    return (
        <div className="flex gap-3 items-center uppercase font-bold opacity-30 my-10">
            <hr className="w-1/2 border border-black" />
            <span>{ title }</span>
            <hr className="w-1/2 border border-black" />
        </div>
    )
}

Devider.propTypes = {
    title: PropTypes.string
}

export default Devider