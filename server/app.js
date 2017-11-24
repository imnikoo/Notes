const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const noteRoutes = require('./routes/notes.js');
const authRoutes = require('./routes/auth.js');
mongoose.Promise = require('q').Promise;
const app = express();

let options = {
   useMongoClient: true,
};


if (process.env.NODE_ENV === 'test') {
   mongoose.connect('mongodb://localhost/testnotes', options);
} else {
   mongoose.connect('mongodb://localhost/devnotes', options);
   app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
}

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(noteRoutes);
app.use(authRoutes);

module.exports = app;