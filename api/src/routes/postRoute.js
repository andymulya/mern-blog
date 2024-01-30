import express from 'express'
import { createPost, getLatestBlog, getTrendingBlogs, getAllBlogsCount, searchBlogs } from '../controllers/postController.js'
import { createPostValidation, verifyToken } from '../middlewares/index.js'

const router = express.Router()

router.post('/create-post', [verifyToken, createPostValidation], createPost)
router.post('/latest-blogs', getLatestBlog)
router.get('/trending-blogs', getTrendingBlogs)
router.post('/search-blogs', searchBlogs)
router.post('/all-blogs-count', getAllBlogsCount)

export default router