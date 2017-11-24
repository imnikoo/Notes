const User = require('../model/user.js');
const encryptionService = require('../services/encryptionService');
const authService  = require('../services/authService');
const zipObject = require('lodash/zipObject.js');
const emailRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


const signUp = (req, res) => {
   let { email, password } = req.body;
   if(!testEmail(email) || !password) {
      res.status(400).send({ errorMessage: 'Email or password is invalid' })
   }
   User.findOne({ email }).then((user) => {
      if(user) {
         res.status(400).send({ errorMessage: 'Such email already registered.'})
      }
      let salt = encryptionService.generateSalt(128);
      let newUser = Object.assign(new User(), {
         email,
         salt,
         password: encryptionService.encrypt(password, salt)
      });
      newUser.save()
         .then(() => res.status(200).send())
         .catch((err) => res.status(500).send(err));
   });
};

const signIn = (req, res) => {
   let credentials = retriveCredentials(req);
   User.findOne({ email: credentials.email }).then((user) => {
      if(!user) {
         res.status(400).send({ errorMessage: 'Email or password is incorrect' })
      }
      let passwordMatch = encryptionService.compare(user.password, credentials.password, user.salt);
      if(passwordMatch) {
         let accessToken = authService.generateToken();
         authService.storeToken(accessToken, user.email);
         res.status(200).send({
            accessToken
         });
      } else {
         res.status(400).send({ errorMessage: 'Email or password is incorrect' })
      }
   })
};

const isAuthenticated = (req, res, next) => {
   let token = req.get('Access-token') || '';
   if(token && authService.checkAuth(token)) {
      next();
   } else {
      res.status(401).send();
   }
};

const testEmail = email => {
   return emailRegExp.test(email);
};

const retriveCredentials = (req) => {
   let headerCredentials = req.get('Authorization');
   let credentialsBase64 = headerCredentials.split(' ')[1];
   let emailPassword = new Buffer(credentialsBase64, 'base64').toString('ascii');
   return zipObject(['email', 'password'], emailPassword.split(':'));
};

module.exports = {
   signUp,
   signIn,
   isAuthenticated
};