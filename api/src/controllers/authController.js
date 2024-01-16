import User from "../models/User.js"
import { isExists } from "../services/userServices.js"
import { createToken, errorCustomHandler, hashString } from "../utils/index.js"


export const signInController = (req, res, next) => {
    
}

export const signUpController = async (req, res, next) => {
    const { fullName, username, email, password } = req.body

    try{
        const hashedPassword = await hashString(password)

        const user = await User.create({
            personal_info: {
                fullName,
                email,
                username,
                password: hashedPassword
            }
        })

        const { password: hashedPassword2, email: hashedEmail2, ...data } = user._doc.personal_info
        const token = createToken({ userId: user._id })

        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Created is succesfully",
            data
        })

    }catch(err){
        const isAvailableEmail = await isExists("email", email)
        const isAvailableUsername = await isExists("username", username)
        
        if(err.code == 11000){
            if(isAvailableEmail) next(errorCustomHandler(500, "Email is available"))
            if(isAvailableUsername) next(errorCustomHandler(500, "Username is available"))
        }

        next(err)
    }

}