import express from 'express'
import { createPost, getLatestBlog } from '../controllers/postController.js'
import { createPostValidation, verifyToken } from '../middlewares/index.js'

const router = express.Router()

router.post('/create-post', [verifyToken, createPostValidation], createPost)
router.get('/latest-blogs', getLatestBlog)

export default router