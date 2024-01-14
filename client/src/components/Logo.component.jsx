import logoMaestroBrain from '../assets/images/maestro_brain.png'

const Logo  = () => {
    return (
        <>
            <div className="flex items-center">
                <img src={ logoMaestroBrain } alt="Logo Maestro Brain" width={40} />
                <h1 className="font-bold text-md text-blue-900 uppercase">
                    .Maestro
                    <span className="text-blue-700">Brain</span>
                </h1>
            </div>
        </>
    )
}

export default Logo