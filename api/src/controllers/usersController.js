import User from "../models/User.js"

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