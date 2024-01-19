import User from "../models/User.js"
import { generateToken, errorCustomHandler, formatDataToSend, hashString } from "../utils/index.js"


export const signInController = async (req, res, next) => {
    const { email } = req.body

    try{
        const user = await User.findOne({ "personalInfo.email": email })

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
        const hashedPassword = await hashString(password)

        const user = await User.create({
            personalInfo: {
                fullName,
                email,
                username,
                password: hashedPassword
            }
        })

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
        const isAvailableEmail = await User.exists({ "personalInfo.email" : email})
        const isAvailableUsername = await User.exists({ "personalInfo.username" : username})
        
        if(err.code == 11000){
            if(isAvailableEmail) return next(errorCustomHandler(409, "Email is available"))
            if(isAvailableUsername) return next(errorCustomHandler(409, "Username is available"))
        }

        next(err)
    }

}

export const googleOauth = async (req, res, next) => {
    const { email, fullName, profileImg } = req.user

    try{
        let user = await User.findOne({ "personalInfo.email": email })
        
        if(user){
            if(!user.googleAuth) return next(errorCustomHandler(403, "This email was signed up without google. Please log in with password to access the account"))
        }else{
            const username = email.split("@")[0]

            user = await User.create({
                personalInfo: {
                    fullName,
                    email,
                    username,
                    profileImg
                },
                googleAuth: true
            })

        }
  
        const token = generateToken({ userId: user._id })
        const data = formatDataToSend(user)

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