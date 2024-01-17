import PropTypes from 'prop-types'
import { IconEye, IconEyeSlash } from './Icon.component'
import { useState } from 'react'


const TextInputIcon = ({ type, name, id, placeholder, minLength, maxLength, style, children }) => {
    const [passwordVisible, setPasswordVisible] = useState(true)


    return (
        <div className="relative">
            <input type={ (type == "password") && passwordVisible ? type : "text" } name={ name } id={ id } placeholder={ placeholder } minLength={ minLength } maxLength={ maxLength } className={`input w-full rounded-md border-0 py-3 bg-blue-100 placeholder:text-gray-700 pl-16 ${ style }`} />
            <div className="input-icon pointer-events-none">
                { children }
            </div>
            {
                // Check icon eye for input password
                (type == "password") && 
                <div className="input-icon left-[auto] right-4" onClick={() => setPasswordVisible((currentVal) => !currentVal)}>
                    {
                        (passwordVisible) ? <IconEyeSlash /> : <IconEye />
                    }
                </div>
            }
        </div>
    )
}

TextInputIcon.propTypes = {
    children: PropTypes.element,
    type: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    style: PropTypes.string
}

export default TextInputIcon