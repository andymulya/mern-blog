import { findUser } from "../services/userServices.js"
import { compareString, errorCustomHandler } from "../utils/index.js"

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

    // validasi ketika inputan kosong
    if(!fullName || !username || !email || !password) return next(errorCustomHandler(400, "Required field missing"))

    // validasi ketika username tidak memenuhi syarat
    if(!usernameRegex.test(username)) return next(errorCustomHandler(400, "Username should be 6 to 15 characters long, and without any spaces"))

    // validasi ketika email tidak memenuhi syarat
    if(!emailRegex.test(email)) return next(errorCustomHandler(400, "Email is invalid"))

    // validasi ketika password tidak memenuhi syarat
    if(!passwordRegex.test(password)) return next(errorCustomHandler(400, "Password should be 6 to 20 characters long with a numeric, 1 lowercase, and 1 uppercase"))

    next()
}
export const signInValidation = async (req, res, next) => {
    const { email, password } = req.body

    if(!email || !password) return next(errorCustomHandler(400, "Required field missing"))

    const user = await findUser({ "personal_info.email": email })
    if(!user) return next(errorCustomHandler(500, "Something when wrong"))

    const comparePassword = await compareString(password, user.personal_info.password)
    if(!comparePassword) return next(errorCustomHandler(500, "Something when wrong"))
    next()
}