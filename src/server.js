const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const dbConnection = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
console.log(dbConnection);
const DB = mongoose.connect(dbConnection, {
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useFindAndModify: false
}).then(() => {
    console.log('~~~DB Connection Successful~~~');
}).catch(err => console.log(err));

const port = process.env.PORT;
app.listen(port, () => {
    console.log('Blog API Started...');
});

