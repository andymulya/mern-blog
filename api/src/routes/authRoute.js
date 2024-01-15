import express from 'express'
import { signInController, signUpController } from '../controllers/authController.js'

const router = express.Router()

router.get('/sign-in', signInController)
router.get('/sign-up', signUpController)

export default router