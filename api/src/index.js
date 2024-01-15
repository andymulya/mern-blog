import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/index.js'
import mongoConnection from './dbConfig/mongodb.js'
import { errorHandler } from './middlewares/index.js'

const app = express()

dotenv.config()

mongoConnection()

app.use(express.json())
app.use(cors())
app.use(router)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT }`)
})