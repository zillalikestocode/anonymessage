import User from '../models/userSchema.js'

export const sendMessage = async(req, res)=>{
	const {username, id, message} = req.body
	try{
		await User.updateOne({username, "rooms.id": Number(id)}, {
			$push: {"rooms.$.messages": message}
		})
		return res.status(201).json({success: true})
	}catch(err){
		return res.status(400).json(err)
	}
}

export const getMessages = async(req, res) => {
	const details = req.body
}