import express from 'express'
import {getRoom, getRooms, createRoom} from '../controllers/room.js'

const router = express.Router()

router.post('/getRooms', getRooms)
router.post('/getRoom', getRoom)
router.post('/create', createRoom)

export default router