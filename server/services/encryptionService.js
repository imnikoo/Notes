const crypto = require('crypto');

const encrypt = (password, salt) => {
   return crypto.createHash('sha256', salt).update(password).digest('hex');
};

const generateSalt = (bytes) => {
   return crypto.randomBytes(bytes).toString('hex');
};

const compare = (hashPassword, password, salt) => {
  return hashPassword === encrypt(password, salt);
};

module.exports = {
   encrypt, generateSalt, compare
};