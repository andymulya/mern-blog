import express from 'express'
import { createPost, getLatestBlog, getTrendingBlogs, getAllBlogsCount, searchBlogs, getBlog, updateBlog } from '../controllers/postController.js'
import { createPostValidation, verifyToken } from '../middlewares/index.js'

const router = express.Router()

router.post('/create-blog', [verifyToken, createPostValidation], createPost)
router.post('/latest-blogs', getLatestBlog)
router.get('/trending-blogs', getTrendingBlogs)
router.post('/search-blogs', searchBlogs)
router.post('/all-blogs-count', getAllBlogsCount)
router.post('/get-blog', getBlog)
router.patch('/update-blog', [verifyToken, createPostValidation], updateBlog)

export default router