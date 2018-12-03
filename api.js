const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const config = require('./config');
const routes= require('./app/routes/home');
const PORT = process.env.PORT || 3000;
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

routes(app);

app.use('/home',routes);

const server = app.listen(PORT, (error) => {
  if (error) return console.log(`Error: ${error}`);

  console.log(`Server listening on port ${server.address().port}`);
});

module.exports = app;
/*
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));*/
