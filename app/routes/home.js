const express = require('express');
const jwt = require("jsonwebtoken");
var apiRoutes = express.Router();


apiRoutes.get('/', function(req, res) {
		res.json([{ message: 'The exams are in /home/exams' },{message: 'The assignments are in /home/assignments'},{message: 'The students are in /home/students'},{message: 'The professors are in /home/professors'}]);
	});

//tokenchecker	

module.exports = apiRoutes;