import { errorCustomHandler } from "../utils/index.js"

export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
}

export const signUpValidation = (req, res, next) => {
    const { fullName, username, email, password } = req.body
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    if(!fullName || !username || !email || !password) return next(errorCustomHandler(400, "Required field missing"))
    if(!emailRegex.test(email)) return next(errorCustomHandler(400, "Email is invalid"))
    if(!passwordRegex.test(password)) return next(errorCustomHandler(400, "Password should be 6 to 20 characters long with a numeric, 1 lowercase, and 1 uppercase"))

    next()
}