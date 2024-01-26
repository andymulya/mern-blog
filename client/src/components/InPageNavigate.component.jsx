import PropTypes from "prop-types"
import { useEffect, useRef, useState } from "react"

const InPageNavigate = ({ routes, defaultHiddenRoutes, defaultTabIndex = 0, children }) => {
    const activeTabLineRef = useRef()
    const activeTabRef = useRef()
    const [inPageNavIndex, setInPageNavIndex] = useState(defaultTabIndex) 
    
    const changeNavState = ({ offsetWidth, offsetLeft }, i) => {
        activeTabLineRef.current.style.width = `${ offsetWidth }px`
        activeTabLineRef.current.style.left = `${ offsetLeft }px`

        setInPageNavIndex(i)
    }
    
    useEffect(() => {
        changeNavState(activeTabRef.current, inPageNavIndex)
    }, [inPageNavIndex])

    return (
        <section>
            <div className="relative mb-8 border-b border-gray-300 flex flex-nowrap overflow-x-auto">
                {
                    routes.map((route, i) => <button ref={ (inPageNavIndex === i) ? activeTabRef : null } key={ i } className={ `btn capitalize ${ (inPageNavIndex === i) ? "text-blue-700" : "text-gray-400" } ${defaultHiddenRoutes.includes(route) && "md:hidden"}`} onClick={(e) => changeNavState(e.target, i)} >{ route }</button>)
                }
                <hr ref={ activeTabLineRef } className="absolute bottom-0 duration-300 border-blue-700" />
            </div>
            { children[inPageNavIndex] }
        </section>
    )
}

export default InPageNavigate

InPageNavigate.propTypes = {
    routes: PropTypes.array,
    defaultTabIndex: PropTypes.number,
    defaultHiddenRoutes: PropTypes.array,
    children: PropTypes.array
}