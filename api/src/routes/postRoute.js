import express from 'express'
import { createPost, getLatestBlog, getTrendingBlogs, getBlogsByCategory, getAllBlogsCount } from '../controllers/postController.js'
import { createPostValidation, verifyToken } from '../middlewares/index.js'

const router = express.Router()

router.post('/create-post', [verifyToken, createPostValidation], createPost)
router.post('/latest-blogs', getLatestBlog)
router.get('/trending-blogs', getTrendingBlogs)
router.post('/search-blogs-category', getBlogsByCategory)
router.post('/all-blogs-count', getAllBlogsCount)

export default router