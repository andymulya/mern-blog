import axios from 'axios'

export const authUser = async (endPoint, payload) => {
    const res = await axios.post(`/auth${endPoint}`, payload)
    return res
}