
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
mongoose.promise = global.Promise;
const bodyParser = require('body-parser');
const noteRoutes = require('./routes/notes.js');

const app = express();


let options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};


if(process.env.NODE_ENV === 'test') {
    mongoose.connect('mongodb://localhost/testnotes', options);
} else {
    mongoose.connect('mongodb://localhost/devnotes', options);
}

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(noteRoutes);

module.exports = app;