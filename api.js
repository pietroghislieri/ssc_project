const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const config = require('./config');
const exam   = require('./app/models/exam');
const assignment = require('./app/models/assignment');

var data_in = new Date();
var data_fin = new Date();

var esame =exam.findOrCreate({
    id: '1',
    name: 'esame algebra', 
    data: '20/05/2018' 
  });

const app = express();

var assignement = assignment.findOrCreate({
    id: '1',
    name: 'programmazione',
    data_inizio: data_in,
    data_fine: data_fin
})


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

var assignmentsRoutes = require('./app/routes/assignments');
app.use('/home/assignments', assignmentsRoutes);

module.exports = app;
