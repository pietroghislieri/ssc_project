const express = require('express');
const jwt = require("jsonwebtoken");
const Assignment   = require('../models/assignment');

var data_in = new Date();
var data_fin = new Date();

const assignmentsRoutes = express.Router(); 

assignmentsRoutes.route('/')
.get(async function(req, res) {
	let assignments = await Assignment.find({});
	res.json(assignments);
})
.post(async function (req, res) {
	var assignment = new Assignment();

	if(req.body.name == undefined)
		res.status(400).send({message: 'Bad syntax: missing parameters'})
	else{
		assignment.name = req.body.name;
		assignment.data_inizio = data_in;
		assignment.data_fine = data_fin;
		saved = await assignment.save()
		res.status(201).send(saved)
	}
	// save the bear and check for errors
})

assignmentsRoutes.route('/:assignment_id')
.get(async function(req, res) {
	let assignment_id = req.params.assignment_id
	if ( assignment_id == 'last' )
		assignment_id = req.assignment.id
	let assignment = await Assignment.findOne( { id: assignment_id } );
	res.json(assignment);
})
.delete(function (req, res) {
	if( Assignment.remove({ id: req.params.assignment_id }) )
		res.status(204).send({ message: 'Successfully deleted' });
	else
		res.status(404).send({ message: 'invalid id' });
})
.put(async function (req, res) {
	let assignment = await Assignment.findOrCreate( { id: req.params.assignment_id } );
	// update info
	assignment.name = req.body.name || assignment.name;
	assignment.data_inizio = new Date() || assignment.data_in;
	assignment.data_fine = new Date() || assignment.data_fin;
	res.status(200).send(assignment);
});



module.exports = assignmentsRoutes;