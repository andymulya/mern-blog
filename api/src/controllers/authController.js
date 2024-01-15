import { errorCustomHandler } from "../utils/index.js"

export const signInController = (req, res, next) => {
    const { email, password } = req.body

    if(!email || !password) return next(errorCustomHandler(400, "Required Field Missing"))

    try{
        return res.json({
            success: true,
            statusCode: 200,
            message: "Sign In Success"
        })
    }catch(err){
        next(err)
    }
}

export const signUpController = (req, res) => {
    res.json({
        data: "Sign Up"
    })
}