const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	biography: { type: String, default: "Your biography goes here." },
	college: { type: Schema.Types.ObjectId, ref: 'College' },
	major: { type: Schema.Types.ObjectId, ref: 'Major' },
	skills: { type: [String], default: ["Your skills go here."] },
	picture: { type: String, default: "/profile/profile.png" },
	resume: { type: String, default: "/resume/resume.pdf" },
});

const User = mongoose.model('User', userSchema);

module.exports = User;