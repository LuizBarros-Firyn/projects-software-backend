require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.use(cors());

app.use(express.json());

function logRequests(request, response, next) {
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.time(logLabel);

    next();

    console.timeEnd(logLabel);
}

app.use(logRequests);

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(routes);

app.listen(process.env.PORT || 3333);