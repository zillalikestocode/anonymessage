import bcrypt from 'bcryptjs'
import User from '../models/userSchema.js'

export const signIn = async (req, res)=>{
	const {username, password} = req.body

	try {
		const oldUser = await User.findOne({username})
		if(!oldUser) return res.status(400).json('user does not exist');
		const correctPassword = await bcrypt.compare(password, oldUser.password)
		if (!correctPassword) return res.status(400).json('incorrect password');
		return res.status(200).json(oldUser)

	}catch(err){
		return res.status(500).json('something went wrong')
		console.log(err)
	}
}

export const signUp = async (req, res)=>{
	const {username, password} = req.body

	try {
		const alreadyExists = await User.findOne({username})
		if (alreadyExists) return res.status(400).json('User Already Exists');
		const hashedPassword = await bcrypt.hash(password, 12) 
		const user = await User.create({username, password: hashedPassword})

		return res.status(200).json(user)
	}catch(err){
		return res.status(500).json("something went wrong")
		console.log(err)
	}
}