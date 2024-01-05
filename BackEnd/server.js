import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()
const PORT = process.env.PORT

// connect mongoDB
import './configs/database.js'

// basic middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.get('/', (req,res) => {
  res.send('BackEnd')
})

// error middleware
app.use(errorHandler)

app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}!`)
})