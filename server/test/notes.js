//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Note = require('../model/note.js');
const crypto = require('crypto');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();
let expect = chai.expect;
const authService = require('../services/authService');
const _ = require('lodash');
const q = require('q');

chai.use(chaiHttp);

describe('Notes', () => {
   beforeEach((done) => {
      Note.remove({}, () => {
         done();
      });
   });
   
   let authToken;
   before(done => {
      authToken = authService.generateToken();
      authService.storeToken(authToken, 'test@email.com');
      done();
   });
   
   describe('/GET note', () => {
      it('it should GET all the notes', (done) => {
         chai.request('http://localhost:9000/')
            .get('api/notes/')
            .set('Access-token', authToken)
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.an('array');
               done();
            });
      });
      
      it('it should GET note by note id', (done) => {
         Object.assign(new Note(), {title: 'first note title', content: 'note content', userId: '1'})
            .save().then((note) => {
            chai.request('http://localhost:9000/')
               .get(`api/notes/${note.id}`)
               .set('Access-token', authToken)
               .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('title').that.does.equal('first note title');
                  res.body.should.have.property('content').that.does.equal('note content');
                  res.body.should.have.property('userId').that.does.equal('1');
                  done();
               });
         });
         
      });
      
      it('it should GET notes by user id', (done) => {
         let notesPromises = [
            Object.assign(new Note(), {title: 'first note title', content: 'note content', userId: '1'}).save(),
            Object.assign(new Note(), {title: 'second note title', content: 'note content', userId: '1'}).save()
         ];
         
         q.all(notesPromises).then(() => {
            chai.request('http://localhost:9000/')
               .get('api/notes/user/1')
               .set('Access-token', authToken)
               .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.an('array').to.have.lengthOf(2);
                  done();
               });
         });
      });
   });
   
   describe('/POST note', () => {
      it('it should create a note', (done) => {
         chai.request('http://localhost:9000/')
            .post('api/notes/')
            .set('Access-token', authToken)
            .type('application/json')
            .send({title: 'note title', content: 'note content', userId: '1'})
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.an('object');
               res.body.should.have.property('title').that.does.equal('note title');
               res.body.should.have.property('content').that.does.equal('note content');
               res.body.should.have.property('userId').that.does.equal('1');
               done();
            });
      })
   });
   
   describe('/PUT note', () => {
      it('it should change note with id', (done) => {
         let note = Object.assign(new Note(), {title: 'note title', content: 'note content', userId: '1'});
         note.save().then(testNote => {
            chai.request('http://localhost:9000/')
               .put(`api/notes/${testNote._id}`)
               .set('Access-token', authToken)
               .type('application/json')
               .send({title: 'new note title', content: 'new note content'})
               .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.an('object');
                  res.body.should.have.property('title').that.does.equal('new note title');
                  res.body.should.have.property('content').that.does.equal('new note content');
                  done();
               });
         })
      });
   });
});