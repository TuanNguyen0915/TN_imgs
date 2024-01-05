import 'dotenv/config'
import express from 'express'
const app = express()
const PORT = process.env.PORT

// connect mongoDB
import './configs/database.js'

app.get('/', (req,res) => {
  res.send('BackEnd')
})


app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}!`)
})