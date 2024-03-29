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

export const searchUsers = async (payload) => {
    try{
        const res = await axios.post(`/user/search-users`, payload)
        return res.data
    }catch(err){
        if(err) throw err
    }
}

export const getUserProfile = async (payload) => {
    try{
        const res = await axios.post(`/user/profile`, payload)
        return res.data
    }catch(err){
        if(err) throw err
    }
}

export const getDetailBlog = async (payload) => {
    try{
        const res = await axios.post("/post/get-blog", payload)
        return res.data
    }catch(err){
        if(err) throw err
    }
}

export const updateBlog = async (payload) => {
    try{
        const res = await axios.patch("/post/update-blog", payload)
        return res.data
    }catch(err){
        if(err) throw err
    }
}

export const likeBlog = async (payload) => {
    try{
        const res = await axios.patch("post/like-blog", payload)
        return res.data
    }catch(err){
        if(err) throw err
    }
}