import express from 'express'
import {sendMessage, getMessages} from '../controllers/message.js'

const router = express.Router()

router.post('/get', getMessages)
router.post('/send', sendMessage)

export default router