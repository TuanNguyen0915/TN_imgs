import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { errorHandler } from './middleware/errorHandler.js'
// connect mongoDB
import './configs/database.js'

// import routers
import { router as authRouter } from './routes/auth.js'
import { router as imgRouter } from './routes/image.js'

const app = express()
const PORT = process.env.PORT || 8080
const corsOption = {
  origin: true,
  credentials: true
}
// basic middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOption))

app.get('/', (req,res) => {
  res.send('BackEnd')
})

// routers
app.use('/api/user/', authRouter)
app.use('/api/image/', imgRouter)

// error middleware
app.use(errorHandler)

app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}!`)
})