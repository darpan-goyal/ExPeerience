const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	biography: { type: String },
	college: { type: Schema.Types.ObjectId, ref: 'College' },
	major: { type: Schema.Types.ObjectId, ref: 'Major' },
	skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
	picture: { type: String },
	resume: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;