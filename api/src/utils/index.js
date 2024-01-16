import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const errorCustomHandler = (statusCode, message) => {
    const err = new Error()
    
    err.statusCode = statusCode
    err.message = message

    return err
}

export const createToken = (value) => jwt.sign(value, process.env.JWT_SECRET)

export const hashString = async (val) => {
    try{
        const hashed = await bcrypt.hash(val, 10)
        return hashed
    }catch(err){
        if(err) throw err
    }
}

export const compareString = async (val, hashVal) => {
    try{
        const compare = await bcrypt.compare(val, hashVal)
        return compare
    }catch(err){
        if(err) throw err
    }
}