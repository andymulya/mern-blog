import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'

export const errorCustomHandler = (statusCode, message) => {
    const err = new Error()
    
    err.statusCode = statusCode
    err.message = message

    return err
}

export const generateToken = (value) => jwt.sign(value, process.env.JWT_SECRET)
export const compareToken = (value, next) => jwt.verify(value, process.env.JWT_SECRET)

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

export const formatDataToSend = (values) => {
    const { personalInfo, ...data1} = values
    const { password: hashedPassword2, ...data2 } = personalInfo

    return {
        personalInfo: data2,
        ...data1
    }
}

// Akan mengubah special karakter pada string menjadi spasi,
// menghapus spasi diawal dan diakhir string
// dan setelahnya akan mengubah spasi menjadi "-"

export const createSlug = (string) => `${string.replace(/[^a-zA-Z0-9]/g, ' ').trim().replace(/\s+/g, '-').toLowerCase()}-${nanoid()}`