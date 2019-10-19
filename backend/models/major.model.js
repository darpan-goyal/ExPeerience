const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const majorSchema = new Schema({
	name: { type: String, required: true },
});

const Major = mongoose.model('Major', majorSchema);

module.exports = Major;