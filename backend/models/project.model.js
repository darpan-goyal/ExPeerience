const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: { type: String },
    college: { type: String },
    majors: { type: [String] },
    description: { type: String },
    skills: { type: [String] },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    peers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;