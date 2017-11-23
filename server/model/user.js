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

User.methods.encrypt = password => {
    //let salt = crypto.randomBytes(128).toString('hex');
    return crypto.createHash('sha256').update(password + this.salt).digest('hex');
};

module.exports = mongoose.model('User', User);