import User from "../models/User.js"
import { formatDataToSend, hashString } from "../utils/index.js"

export const create = async (fullName, username, email, password) => {
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

        return formatDataToSend(user._doc)

    }catch(err){
        if(err) throw err
    }
}

export const isExists = async (key, value) => {

    try{
        switch (key) {
            case "email":
                const email = await User.exists({ "personal_info.email" : value})
                return email
            case "username":
                const username = await User.exists({ "personal_info.username" : value})
                return username
            default:
                throw "Key is not available"
        }
    }catch(err){
        if(err) throw err
    }
}

export const findUser = async (key) => {
    try{
        const user = await User.findOne(key)
        return user
    }catch(err){
        if(err) throw err
    }
}