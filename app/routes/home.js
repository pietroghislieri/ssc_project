const express = require('express');
var apiRoutes = express.Router();


apiRoutes.get('/', function(req, res) {
		res.json([{ message: 'The exams are in /home/exams' },{message: 'The assignments are in /home/assignments'},{message: 'The students are in /home/students'},{message: 'The professors are in /home/professors'}]);
	});




module.exports = apiRoutes;