const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const config = require('./config');
const exam   = require('./app/models/exam');
const assignment = require('./app/models/assignment');
const student = require('./app/models/student');
const professor = require('./app/models/professor');

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

var studente =student.findOrCreate({
  id: '1',
  name: 'Gianluca', 
  surname: 'Vacchi' 
});

var professore =professor.findOrCreate({
  id: '1',
  name: 'Annelise', 
  surname: 'Defranceschi',
  admin:true 
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.send('Hello! The API is at /home');
});


var homeRoutes= require ('./app/routes/home')
app.use('/home', homeRoutes);

var examsRoutes = require('./app/routes/exams');
app.use('/home/exams', examsRoutes);

var assignmentsRoutes = require('./app/routes/assignments');
app.use('/home/assignments', assignmentsRoutes);

var studentRoutes = require('./app/routes/students');
app.use('/home/students', studentRoutes);

var professorRoutes = require('./app/routes/professors');
app.use('/home/professors', professorRoutes);

module.exports = app;
