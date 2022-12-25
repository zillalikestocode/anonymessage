import User from '../models/userSchema.js'

export const createRoom = async(req, res)=>{
	const details = req.body

	try {
		const newRoom = await User.findOneAndUpdate({username: details.owner}, {$push: {rooms: details}})
		if (!newRoom) return res.status(500).json("Something went wrong")
			
		return res.status(201).json({
			success: true,
			message: "Room created successfully"
		})
	}catch(err){
		res.status(400).json({
			error: 'Could not create a room',
			data: err
		})
	}
}

export const getRooms = async(req, res) =>{
	const {username} = req.body

	try {
		const user = await User.findOne({username})

		return res.status(200).json(user.rooms)
	}catch(error){
		res.status(400).json({error})
	}
}

export const getRoom = async(req, res) => {
	const {id, username} = req.body

	try {
		const user = await User.findOne({username})
		if(!user) return res.status(400).json({message: 'No such user exists'});
		const room = user.rooms.filter((item)=> item.id === Number(id))[0]

		return res.status(200).json(room)
	}catch(err){
		res.status(400).json({err})
	}
}