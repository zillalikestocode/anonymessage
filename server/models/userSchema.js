import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	rooms: {type: Array},
	id: {type: String}
})

export default mongoose.model('User', UserSchema)