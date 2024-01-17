import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {}
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        handleAuthUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { handleAuthUser } = userSlice.actions
export default userSlice.reducer