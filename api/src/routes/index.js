import express from 'express'
import authRoute from './authRoute.js'
import postRoute from './postRoute.js'
import usersRoute from './usersRoute.js'

const router = express.Router()

router.use('/auth', authRoute)
router.use('/post', postRoute)
router.use('/users', usersRoute)

export default router