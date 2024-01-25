import axios from 'axios'

export const authUserService = async (endPoint, payload) => {
    try{
        const res = await axios.post(`/auth${endPoint}`, payload)
        return res.data
    }catch(err){
        if(err) throw err
    }
}

export const postBlog = async (endPoint, payload) => {
    try{
        const res = await axios.post(`/post${endPoint}`, payload)
        return res.data
    }catch(err){
        if(err) throw err
    }
}
