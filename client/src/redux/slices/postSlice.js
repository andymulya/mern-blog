import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    banner: "",
    title: "",
    body: [],
    tags: [],
    desc: "",
    author: { personalInfo: {} }
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers:{
        setDataPost: (state, action) => {
            state = action.payload
            return state
        }
    }
})

export const { setDataPost } = postSlice.actions
export default postSlice.reducer

