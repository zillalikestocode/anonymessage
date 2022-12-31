import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	rooms: [
		{
			id: { type: Number },
			description: {type: String},
			owner: {type: String},
			messages: [{ text: { type: String }, date: { type: Date } }],
		},
	],
	id: { type: String },
});

export default mongoose.model("User", UserSchema);
