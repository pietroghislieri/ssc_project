const express = require('express');
var apiRoutes = express.Router();


apiRoutes.get('/', function(req, res) {
		res.json([{ message: 'The exams are in /home/exams' },{message: 'The assignments are in /home/assignments'}]);
	});




module.exports = apiRoutes;