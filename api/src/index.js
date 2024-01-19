import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import admin from 'firebase-admin'
import serviceAccountKey from './dbConfig/mern-blog-b9526-firebase-adminsdk-63dvy-7278ca4eb9.json' assert { type: "json" }
import router from './routes/index.js'
import mongoConnection from './dbConfig/mongodb.js'
import { errorHandler } from './middlewares/index.js'

const app = express()

dotenv.config()



mongoConnection()

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))
app.use(express.json())
app.use(cookieParser())
app.use(router)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
})

app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT }`)
})