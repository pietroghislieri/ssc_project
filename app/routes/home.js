const express = require('express');
var apiRoutes = express.Router();


apiRoutes.get('/', function(req, res) {
		res.json({ message: 'The exams are in /home/exams' });
	});




module.exports = apiRoutes;