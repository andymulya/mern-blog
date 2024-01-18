import axios from 'axios'

export const authUser = async (endPoint, payload) => {
    try{
        const res = await axios.post(`/auth${endPoint}`, payload)
        return res
    }catch(err){
        if(err) throw err
    }
}