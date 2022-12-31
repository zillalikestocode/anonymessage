import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoutes from './routes/user.js'
import messageRoutes from './routes/message.js'
import roomRoutes from './routes/room.js'

dotenv.config()

const app = express()

app.use(express.json({limit: '30mb', extended: true}))
app.use(express.urlencoded({limit: '30mb', extended: true}))
app.use(cors())
app.use('/user', userRoutes)
app.use('/room', roomRoutes)
app.use('/message', messageRoutes)
app.get('/', (req, res)=>{
	res.send('Hi mom')
})

const url = process.env.CONNECTION_URL
const PORT = 5000

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> app.listen(PORT, ()=> console.log('server running on port 5000')))

