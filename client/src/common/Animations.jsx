import PropTypes from 'prop-types'
import { motion, AnimatePresence } from "framer-motion"

export const AnimationWrapper = ({ children, keyValue, transition, className }) => {
    return(
        <AnimatePresence>
            <motion.div key={ keyValue } initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={ transition } className={ className }>
                { children }
            </motion.div>
        </AnimatePresence>
    )
}

AnimationWrapper.propTypes = {
    children: PropTypes.element,
    keyValue: PropTypes.string,
    transition: PropTypes.object,
    className: PropTypes.string
}