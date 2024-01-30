import axios from 'axios'

export const authUserService = async (endPoint, payload) => {
    try{
        const res = await axios.post(`/auth${endPoint}`, payload)
        return res.data
    }catch(err){
        if(err) throw err
    }
}

export const createBlog = async (endPoint, payload) => {
    try{
        const res = await axios.post(`/post${endPoint}`, payload)
        return res.data
    }catch(err){
        if(err) throw err
    }
}

export const getLatestBlogs = async (endPoint, payload) => {
    try{
        const res = await axios.post(`/post${endPoint}`, payload)
        return res.data
    }catch(err){
        if(err) throw err
    }
}

export const getTrendingBlogs = async (endPoint) => {
    try{
        const res = await axios.get(`/post${endPoint}`)
        return res.data
    }catch(err){
        if(err) throw err
    }
}

export const searchBlogs = async (payload) => {
    try{
        const res = await axios.post(`/post/search-blogs`, payload)
        return res.data
    }catch(err){
        if(err) throw err
    }
}

export const getAllTotalBlogs = async (endPoint, payload) => {
    try{
        const res = await axios.post(`/post${endPoint}`, payload)
        return res.data
    }catch(err){
        if(err) throw err
    }
}