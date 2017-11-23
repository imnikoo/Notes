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
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    passwordConf: {
        type: String,
        required: true,
    }
});

User.methods.encrypt = password => {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

module.exports = mongoose.model('User', User);