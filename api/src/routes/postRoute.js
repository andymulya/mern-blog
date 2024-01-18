import express from 'express'
import { getPost } from '../controllers/postController.js'
import { authorization } from '../middlewares/index.js'

const router = express.Router()

router.get('/', authorization, getPost)

export default router