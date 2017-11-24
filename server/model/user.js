let mongoose = require('mongoose');
let crypto = require('crypto');
let Schema = mongoose.Schema;

let User = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', User);