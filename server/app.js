
// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const config = require('config');
const app = express();

let options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.post('/auth', (req, res) => {
   mongoose.connect(config.DBHost, options);
});

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;