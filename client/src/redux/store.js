import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import postSlice from './slices/postSlice'

const store = configureStore({
    reducer: {
        user: userSlice,
        post: postSlice
    }
})

export default store