//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Note = require('../model/note.js');
let User = require('../model/user.js');
const crypto = require('crypto');
//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe('Auth', () => {
    beforeEach((done) => { //Перед каждым тестом чистим базу
        User.remove({}, (err) => {
            done();
        });
    });

    describe('/POST/signup', () => {
        it('it should create new user with email and hashed password', (done) => {
            let user = {
                email: 'userBOSS@gmail.com',
                password: 'password'
            };

            //let passwordWithSalt = crypto.createHash('sha256').update('password').digest('hex');
            //let salt = crypto.randomBytes(128).toString('hex');

            chai.request('http://localhost:9000/')
                .post('api/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    User.findOne({email: 'userBOSS@gmail.com'}).then(dbuser => {
                        expect(dbuser).to.exist();
                        dbuser.should.have.property('password').that.does.equal(dbuser.encrypt(user.password));
                        dbuser.should.have.property('email').that.does.equal(user.email);
                    });
                    done();
                });
        });

        it('it should return bad result if there already such email', (done) => {
            let user = {
                email: 'userBOSS@gmail.com',
                password: 'password',
            };

            //let passwordWithSalt = crypto.createHash('sha256').update('password').digest('hex');
            //let salt = crypto.randomBytes(128).toString('hex');

            chai.request('http://localhost:9000/')
                .post('api/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an('object');
                    res.body.should.have.property('errorMessage').that.does.equal('Such email already registered.');

                    done();
                });
        });
    });

    describe('/POST/signin', () => {
        it('it should return auth token', (done) => {
            let credentials = {
                email: 'userBOSS@gmail.com',
                password: 'password',
            };
            let user = Object.assign(new User(), credentials, {
                salt: 'salt'
            });
            user.password = user.encrypt(user.password);
            user.save().then(() => {
                chai.request('http://localhost:9000/')
                    .post('api/auth/signin')
                    .send(credentials)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('token');
                        done();
                    });
            });
        });
    });
});

describe('Notes', () => {
    beforeEach((done) => { //Перед каждым тестом чистим базу
        Note.remove({}, (err) => {
            done();
        });
    });

    describe('/GET note', () => {
        it('it should GET all the notes', (done) => {
            chai.request('http://localhost:9000/')
                .get('api/notes/')
                .end((err, res) => {
                    console.log(err);
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    done();
                });
        });
    });

    describe('/POST note', () => {
        it('it should create a note', (done) => {
            chai.request('http://localhost:9000/')
                .post('api/notes/')
                .type('application.json')
                .send({title: 'note title', content: 'note content'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('title').that.does.equal('note title');
                    res.body.should.have.property('content').that.does.equal('note content');
                    done();
                });
        })
    });

    describe('/PUT note', () => {
        it('it should change note with id', (done) => {
            let note = Object.assign(new Note(), {
                title: 'note title',
                content: 'note content'
            });
            note.save().then(testNote => {
                chai.request('http://localhost:9000/')
                    .put(`api/notes/${testNote._id}`)
                    .type('application.json')
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