import { hashString } from "../utils/index.js"


export const signInController = (req, res, next) => {
    
}

export const signUpController = async (req, res, next) => {
    const { fullName, username, email, password } = req.body

    try{
        const hasedPassword = await hashString(password)
        
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Created is succesfully"
        })

    }catch(err){
        next(err)
    }

}