const express = require('express');
const userRouter = require('../router/userRouter');
const path = require('path');
const fileupload = require('express-fileupload');


const defaultPath = path.join(__dirname, '../');
console.log(defaultPath);
const app = express();

app.use(express.static(defaultPath));

app.use(fileupload());

app.use(express.json());

app.use('/api/v1/blogs', userRouter);

module.exports = app;