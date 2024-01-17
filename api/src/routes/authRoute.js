import express from 'express'
import { signInController, signUpController } from '../controllers/authController.js'
import { signInValidation, signUpValidation } from '../middlewares/index.js'

const router = express.Router()

router.post('/sign-in', signInValidation, signInController)
router.post('/sign-up', signUpValidation, signUpController)

export default router