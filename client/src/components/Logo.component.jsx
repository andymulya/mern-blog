import { Link } from 'react-router-dom'
import logoMaestroBrain from '../assets/images/maestro_brain.png'

const Logo  = () => {
    return (
        <>
            <Link to={"/"} className="flex items-center mr-3">
                <img src={ logoMaestroBrain } alt="Logo Maestro Brain" className="w-[40px]" />
                <h1 className="font-bold text-sm md:text-base text-blue-900 uppercase">
                    .Maestro
                    <span className="text-blue-700">Brain</span>
                </h1>
            </Link>
        </>
    )
}

export default Logo