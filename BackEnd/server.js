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

app.get('/', function (req,res) { 
  res.send("Backend Server")
})


// basic middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOption))


// routers
app.use('/api/user/', authRouter)
app.use('/api/image/', imgRouter)

// error middleware
app.use(errorHandler)

app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}!`)
})