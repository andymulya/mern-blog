import { findUser } from "../services/userServices.js"
import { compareString, compareToken, errorCustomHandler } from "../utils/index.js"

export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
}

export const signUpValidation = async (req, res, next) => {
    const { fullName, username, email, password } = req.body
    
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ // regex for email
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/ // regex for password
    const usernameRegex = /^[a-z0-9]{6,15}$/i // regex for username

    if(!fullName || !username || !email || !password) return next(errorCustomHandler(400, "Required field missing"))

    if(!usernameRegex.test(username)) return next(errorCustomHandler(400, "Username should be 6 to 15 characters long, without any special characters and without any spaces"))

    if(!emailRegex.test(email)) return next(errorCustomHandler(400, "Email is invalid"))

    if(!passwordRegex.test(password)) return next(errorCustomHandler(400, "Password should be 6 to 20 characters long with a numeric, 1 lowercase, and 1 uppercase"))

    next()
}

export const signInValidation = async (req, res, next) => {
    const { email, password } = req.body

    if(!email || !password) return next(errorCustomHandler(400, "Required field missing"))

    try{
        const user = await findUser({ "personalInfo.email": email })
        
        if(!user) return next(errorCustomHandler(500, "Something when wrong"))
        const comparePassword = await compareString(password, user.personalInfo.password)
        if(!comparePassword) return next(errorCustomHandler(500, "Something when wrong"))
    }catch(err){
        return next(err)
    }

    next()
}

export const authorization = async (req, res, next) => {
    const token = req.cookies.access_token

    if(!token) return next(errorCustomHandler(403, "Access denide"))

    try{
        const decode = compareToken(token)
        req.userId = decode.userId
        next()
    }catch(err){
        res.clearCookie("access_token")
        next(err)
    }
}