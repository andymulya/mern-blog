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
        },
        handleSignOutUser: (state) => {
            if(state.user.token){
                state.user = {}
            }
        }
    }
})

export const { handleAuthUser, handleSignOutUser } = userSlice.actions
export default userSlice.reducer