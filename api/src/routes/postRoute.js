import express from 'express'
import { createPost } from '../controllers/postController.js'
import { verifyToken } from '../middlewares/index.js'

const router = express.Router()

router.post('/create-post', verifyToken, createPost)

export default router