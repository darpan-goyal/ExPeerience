const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: { type: String },
    college: { type: String },
    majors: { type: [String], },
    description: { type: String, default: "Project description goes here." },
    skills: { type: [String], default: ["Skills go here."] },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    peers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;