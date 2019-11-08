const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: { type: String },
    description: { type: String },
    college: { type: Schema.Types.ObjectId, ref: 'College' },
	majors: [{ type: Schema.Types.ObjectId, ref: 'Major' }],
    skills: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    peers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;