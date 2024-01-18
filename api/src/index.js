import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
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

app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT }`)
})