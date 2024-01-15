import express from 'express'
import { signInController, signUpController } from '../controllers/authController.js'
import { signUpValidation } from '../middlewares/index.js'

const router = express.Router()

router.post('/sign-in', signInController)
router.post('/sign-up', signUpValidation, signUpController)

export default router