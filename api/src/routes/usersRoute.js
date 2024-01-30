import express from "express"
import { searchUsers } from "../controllers/usersController.js"

const router = express.Router()

router.post('/search-users', searchUsers)

export default router