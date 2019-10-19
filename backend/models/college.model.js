const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const collegeSchema = new Schema({
	name: { type: String, required: true },
});

const College = mongoose.model('College', collegeSchema);

module.exports = College;