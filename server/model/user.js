let mongoose = require('mongoose');
let crypto = require('crypto');
let Schema = mongoose.Schema;

let User = new Schema (
    {
        name: { type: String, required: true },
        login: { type: String, required: true },
        passwordHash: {type: String, required: true },
        salt: {type: String, required: true },
        createdAt: {type: Date, default: Date.now }
    }
);

User.pre('save', next => {
    let now = new Date();
    if(!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

User.methods.encrypt = password => {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

module.exports = mongoose.model('User', User);