import axios from 'axios'

const baseUrl = 'http://localhost:3000'

export const authUser = async (endPoint, payload) => {
    const res = await axios.post(`${baseUrl}/auth${endPoint}`, payload)
    return res
}