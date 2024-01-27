import express from 'express'
import { createPost, getLatestBlog, getTrendingBlogs, getBlogsByCategory } from '../controllers/postController.js'
import { createPostValidation, verifyToken } from '../middlewares/index.js'

const router = express.Router()

router.post('/create-post', [verifyToken, createPostValidation], createPost)
router.get('/latest-blogs', getLatestBlog)
router.get('/trending-blogs', getTrendingBlogs)
router.post('/search-blogs-category', getBlogsByCategory)

export default router