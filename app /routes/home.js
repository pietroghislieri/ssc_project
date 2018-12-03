const express = require('express');
var apiRoutes = express.Router();
apiRoutes.get('/', function(req, res) {
	res.json({ message: 'Welcome to the coolest API on earth!' });
});

module.exports = apiRoutes;