const express = require('express');
var apiRoutes = express.Router();

const router = apiRoutes => {
	apiRoutes.get('/home', function(req, res) {
		res.json({ message: 'Welcome to the coolest API on earth!' });
	});

	apiRoutes.get('/', function(req, res) {
		res.send('Hello! The API is at /home');
	});
	
}

module.exports = router;