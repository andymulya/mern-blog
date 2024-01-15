import bcrypt from 'bcrypt'

export const errorCustomHandler = (statusCode, message) => {
    const err = new Error()
    
    err.statusCode = statusCode
    err.message = message

    return err
}

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