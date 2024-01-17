import { create, findUser, isExists } from "../services/userServices.js"
import { createToken, errorCustomHandler, formatDataToSend } from "../utils/index.js"


export const signInController = async (req, res, next) => {
    const { email } = req.body

    try{
        const user = await findUser({ "personal_info.email": email })

        const data = formatDataToSend(user._doc)
        const token = createToken({ userId: user._id })

        res.status(200).json({
            success: true,
            statusCode: 201,
            message: "Sign in is succesfully",
            access_token: token,
            data
        })
        
    }catch(err){
        next(err)
    }

}

export const signUpController = async (req, res, next) => {
    const { fullName, username, email, password } = req.body

    try{

        const user = await create(fullName, username, email, password)
        const token = createToken({ userId: user._id })

        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Created is succesfully",
            access_token: token,
            data: { ...user }
        })

    }catch(err){
        const isAvailableEmail = await isExists("email", email)
        const isAvailableUsername = await isExists("username", username)
        
        if(err.code == 11000){
            if(isAvailableEmail) return next(errorCustomHandler(409, "Email is available"))
            if(isAvailableUsername) return next(errorCustomHandler(409, "Username is available"))
        }

        next(err)
    }

}