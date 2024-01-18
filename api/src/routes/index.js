import express from 'express'
import authRoute from './authRoute.js'
import postRoute from './postRoute.js'

const router = express.Router()

router.use('/auth', authRoute)
router.use('/post', postRoute)

export default router