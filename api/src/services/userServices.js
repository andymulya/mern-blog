import User from "../models/User.js"

export const create = () => {

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