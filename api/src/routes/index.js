import express from 'express'
import authRoute from './authRoute.js'
import postRoute from './postRoute.js'
import userRoute from './userRoute.js'

const router = express.Router()

router.use('/auth', authRoute)
router.use('/post', postRoute)
router.use('/user', userRoute)

export default router