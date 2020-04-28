const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = Schema({
    message: String,
    time: String,
    true_time: String,
    from: String,
    to: String
}, { shardKey: { from: 1 } }
)

var Message = mongoose.model('Inbox', messageSchema);

module.exports = Message