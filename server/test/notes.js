//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Note = require('../model/note.js');

//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);
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