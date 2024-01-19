import express from 'express'
import { googleOauth, signInController, signUpController } from '../controllers/authController.js'
import { googleOauthValidation, signInValidation, signUpValidation } from '../middlewares/index.js'

const router = express.Router()

router.post('/sign-in', signInValidation, signInController)
router.post('/sign-up', signUpValidation, signUpController)
router.post('/google-auth', googleOauthValidation, googleOauth)

export default router