import express from "express"
import { searchUsers } from "../controllers/userController.js"
import { getUser } from "../controllers/userController.js"

const router = express.Router()

router.post('/profile', getUser)
router.post('/search-users', searchUsers)

export default router