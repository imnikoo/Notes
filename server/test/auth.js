process.env.NODE_ENV = 'test';

let User = require('../model/user.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

let mongoose = require("mongoose");
let server = require('../../server');
let should = chai.should();
let expect = chai.expect;

const encryptionService = require('../services/encryptionService');

describe('Auth', () => {
   beforeEach((done) => {
      User.remove({}, () => {
         done();
      });
   });

   describe('Sign up', () => {
      it('it should register user with email and password', (done) => {
         let user = {
            email: 'userBOSS@gmail.com',
            password: 'password'
         };
         chai.request('http://localhost:9000/')
            .post('api/auth/signup')
            .type('application/json')
            .send(user)
            .end((err, res) => {
               res.should.have.status(200);
               User.findOne({email: 'userBOSS@gmail.com'}).then(dbuser => {
                  dbuser.should.have.property('password').that.does.not.equal(user.password);
                  dbuser.should.have.property('email').that.does.equal(user.email);
                  done();
               });
            });
      });

      it('it should return error if email or password is invalid', (done) => {
         let user = {
            email: 'userBOSScom',
            password: ''
         };
         chai.request('http://localhost:9000/')
            .post('api/auth/signup')
            .type('application/json')
            .send(user)
            .end((err, res) => {
               res.should.have.status(400);
               res.body.should.be.an('object');
               res.body.should.have.property('errorMessage').that.does.equal('Email or password is invalid');
               done();
            });
      });

      it('it should return error if email already registered', (done) => {
         let user = Object.assign(new User(), {
            email: 'userBOSS@gmail.com',
            password: 'password',
            salt: 'salt'
         });
         user.save().then(() => {
            chai.request('http://localhost:9000/')
               .post('api/auth/signup')
               .type('application/json')
               .send(user)
               .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.an('object');
                  res.body.should.have.property('errorMessage').that.does.equal('Such email already registered.');
                  done();
               });
         });
      });
   });

   describe('Sign in', () => {
      it('it should return auth token and userId', (done) => {
         let user = Object.assign(new User(), {
            email: 'userBOSS@gmail.com',
            password: 'password',
            salt: encryptionService.generateSalt(36)
         });
         user.password = encryptionService.encrypt(user.password, user.salt);

         user.save().then(() => {
            let credentials = {
               email: 'userBOSS@gmail.com',
               password: 'password',
            };
            credentials = new Buffer(`${credentials.email}:${credentials.password}`).toString('base64');
            chai.request('http://localhost:9000/')
               .get('api/auth/signin')
               .set('Authorization', `Basic ${credentials}`)
               .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('accessToken');
                  res.body.should.have.property('userId');
                  done();
               });
         });

      });

      it('it should return error (wrong password)', (done) => {
         let user = Object.assign(new User(), {
            email: 'userBOSS@gmail.com',
            password: 'password',
            salt: encryptionService.generateSalt(36)
         });
         user.password = encryptionService.encrypt(user.password, user.salt);

         user.save().then(() => {
            let credentials = {
               email: 'userBOSS@gmail.com',
               password: 'incorrect password',
            };
            credentials = new Buffer(`${credentials.email}:${credentials.password}`).toString('base64');
            chai.request('http://localhost:9000/')
               .get('api/auth/signin')
               .set('Authorization', `Basic ${credentials}`)
               .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.have.property('errorMessage').that.does.equal('Email or password is incorrect');
                  done();
               });
         });

      });

      it('it should return error (wrong email)', (done) => {
         let user = Object.assign(new User(), {
            email: 'userBOSS@gmail.com',
            password: 'password',
            salt: encryptionService.generateSalt(36)
         });
         user.password = encryptionService.encrypt(user.password, user.salt);

         user.save().then(() => {
            let credentials = {
               email: 'userBIGBOSS@gmail.com',
               password: 'password',
            };
            credentials = new Buffer(`${credentials.email}:${credentials.password}`).toString('base64');
            chai.request('http://localhost:9000/')
               .get('api/auth/signin')
               .set('Authorization', `Basic ${credentials}`)
               .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.have.property('errorMessage').that.does.equal('Email or password is incorrect');
                  done();
               });
         });
      });
   });
});