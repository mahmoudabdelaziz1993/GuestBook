const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
  content: { type: String },
  name:{ type: String },
  author : { type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Message', messageSchema);