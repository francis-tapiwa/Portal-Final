const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cuid = require('cuid');

const userSchema = Schema({
    _id: { type: String, default: cuid },
    username: String,
    password: { type: String, required: true },
    email: String,
    imageUrl: String
})

var User = mongoose.model('User', userSchema);

module.exports = User