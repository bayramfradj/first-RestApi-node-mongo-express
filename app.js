const express = require('express');

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors  = require('cors');
require('dotenv/config');

//middlewares
app.use(cors());
app.use(bodyParser.json());

//import Routs
const postRoute = require('./routes/posts');


app.use('/posts',postRoute);



mongoose.connect(process.env.DB_CONNECTION,
{ useNewUrlParser: true ,useUnifiedTopology: true },
()=>{
    console.log('connected to DB')
});

app.listen(3000);