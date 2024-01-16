import User from "../models/User.js"
import { hashString } from "../utils/index.js"

export const create = async (fullName, username, email, password) => {
    const hashedPassword = await hashString(password)

    const user = await User.create({
        personal_info: {
            fullName,
            email,
            username,
            password: hashedPassword
        }
    })

    const { personal_info, ...any} = user._doc
    const { password: hashedPassword2, ...data } = personal_info

    return {
        personal_data: data,
        ...any
    }
}

export const isExists = async (key, value) => {

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
}