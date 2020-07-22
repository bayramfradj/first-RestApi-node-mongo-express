const express = require('express');

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
require('dotenv/config');

const postRoute = require('./routes/posts');

app.use(bodyParser.json());

//routes
app.use('/posts',postRoute);



mongoose.connect(process.env.DB_CONNECTION,
{ useNewUrlParser: true ,useUnifiedTopology: true },
()=>{
    console.log('connected to DB')
});

app.listen(3000);