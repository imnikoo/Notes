const crypto = require('crypto');
const NodeCache = require('node-cache');
const authCache = new NodeCache({ stdTTL: 1800, checkperiod: 1820 });

const generateToken = () => {
   return crypto.createHash('sha256', crypto.randomBytes(8).toString('hex')).update(crypto.randomBytes(8).toString('hex')).digest('hex');
};

const storeToken = (token, email) => {
   authCache.set(token, email);
};

const checkAuth = (token) => {
   return !!authCache.get(token);
};

module.exports = {
   generateToken,
   storeToken,
   checkAuth
};