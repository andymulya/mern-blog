import { create, findUser, isExists } from "../services/userServices.js"
import { generateToken, errorCustomHandler, formatDataToSend } from "../utils/index.js"


export const signInController = async (req, res, next) => {
    const { email } = req.body

    try{
        const user = await findUser({ "personalInfo.email": email })

        const data = formatDataToSend(user._doc)
        const token = generateToken({ userId: user._id })

        res.cookie("access_token", token, { secure: true, httpOnly: true, maxAge: 3600000 }).status(200).json({
            success: true,
            statusCode: 201,
            message: "Sign in is succesfully",
            data:{
                fullName: data.personalInfo.fullName,
                username: data.personalInfo.username,
                profileImg: data.personalInfo.profileImg,
                token
            }
        })
        
    }catch(err){
        next(err)
    }

}

export const signUpController = async (req, res, next) => {
    const { fullName, username, email, password } = req.body

    try{
        const user = await create(fullName, username, email, password)
        const token = generateToken({ userId: user._id })
        const data = formatDataToSend(user._doc)

        res.cookie("access_token", token, { secure: true, httpOnly: true, maxAge: 3600000 }).status(201).json({
            success: true,
            statusCode: 201,
            message: "Created is succesfully",
            data:{
                fullName: data.personalInfo.fullName,
                username: data.personalInfo.username,
                profileImg: data.personalInfo.profileImg,
                token
            }
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