const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	biography: { type: String, default: "Your biography goes here." },
	college: { type: String },
	major: { type: String },
	skills: { type: [String], default: ["Your skills go here."] },
	picture: { type: String, default: "/profile/profile.png" },
	resume: { type: String, default: "Your resume goes here." },
});

const User = mongoose.model('User', userSchema);

module.exports = User;