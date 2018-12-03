const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const config = require('./config');
const exam   = require('./app/models/exam');



var esame =exam.findOrCreate({
    id: '1',
    name: 'esame algebra', 
    data: '20/05/2018' 
  });

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.set('superSecret', config.secret);
app.get('/', function(req, res) {
  res.send('Hello! The API is at /home');
});


var homeRoutes= require ('./app/routes/home')
app.use('/home', homeRoutes);

var examsRoutes = require('./app/routes/exams');
app.use('/home/exams', examsRoutes);

module.exports = app;
