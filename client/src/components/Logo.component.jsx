import { Link } from 'react-router-dom'
import logoMaestroBrain from '../assets/images/maestro_brain.png'

const Logo  = () => {
    return (
        <>
            <Link to={"/"} className="flex items-center mr-3">
                <img src={ logoMaestroBrain } alt="Logo Maestro Brain" width={40} />
                <h1 className="font-bold text-md text-blue-900 uppercase">
                    .Maestro
                    <span className="text-blue-700">Brain</span>
                </h1>
            </Link>
        </>
    )
}

export default Logo