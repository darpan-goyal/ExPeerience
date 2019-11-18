const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema({
  requester: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true}
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;