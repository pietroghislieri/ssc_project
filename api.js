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

var apiRoutes= require('./app/routes/home');
apiRoutes(app);
app.use('/home',apiRoutes);

module.exports = app;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
