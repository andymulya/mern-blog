import User from "../models/User.js"
import { errorCustomHandler } from "../utils/index.js"

export const searchUsers = async (req, res, next) => {
    const { query } = req.body

    try{
        const users = await User.find({ "personalInfo.username": new RegExp(query, 'i') })
        .select("personalInfo.fullName personalInfo.username personalInfo.profileImg -_id")
        .limit(50)

        res.status(200).json({
            success: true,
            message: "Success",
            users
        })
    }catch(err){
        next(err)
    }

}

export const getUser = async (req, res, next) => {

    const { username } = req.body

    try{
        const user = await User.findOne({ "personalInfo.username": username })
        .select("-personalInfo.password -googleAuth -blogs -updatedAt")

        if(!user) return next(errorCustomHandler(404, "User not found"))

        res.status(200).json({
            success: true,
            message: "Success",
            user
        })
    }catch(err){
        next(err)
    }

}