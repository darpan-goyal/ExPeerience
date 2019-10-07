const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstName: { type: String },
	lastName: { type: String },
	biography: { type: String },
	college: { type: Schema.ObjectId, ref: 'College' },
	skill: [{ type: Schema.ObjectId, ref: 'Skill' }],
	picture: { type: String },
	resume: { type: String },
});

const User = mongoose.model('College', userSchema);

module.exports = User;