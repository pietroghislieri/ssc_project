const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const config = require('./config');

//const User   = require('./app/models/user');



/*var nick =Exam.findOrCreate({
    id: '1234',
    name: 'nick', 
    password: 'nick',
    admin: true 
  });
*/

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.set('superSecret', config.secret);
app.get('/', function(req, res) {
  res.send('Hello! The API is at /home');
});


var homeRoutes= require ('./app/routes/home')
app.use('/api/home', homeRoutes);

module.exports = app;
