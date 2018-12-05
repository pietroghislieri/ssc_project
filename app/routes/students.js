const express = require('express');
const Student   = require('../models/student');
const jwt = require("jsonwebtoken");

const studentsRoutes = express.Router(); 

studentsRoutes.route('/')
.get(async function(req, res) {
	let students = await Student.find({});
	res.json(students);
})
.post(async function (req, res) {
	var student = new Student();
	if(req.body.name == undefined || req.body.surname == undefined || req.body.password == undefined){
		res.status(400).send({message: 'Bad syntax: missing parameters'})
	}
	else{
		student.name = req.body.name;
		student.surname = req.body.surname;
		student.password= req.body.password;
		saved = await student.save()
		res.status(201).send(saved)
	}
})

studentsRoutes.route('/:student_id')
.get(async function(req, res) {
	let student_id = req.params.student_id
	if ( student_id == 'me' )
		student_id = req.student.id
	let student = await Student.findOne( { id: student_id } );
	res.json(student);
})
.delete(function (req, res) {
	if( Student.remove({ id: req.params.student_id }) )
		res.status(204).send({ message: 'Successfully deleted' });
	else
		res.status(404).send({ message: 'invalid id' });
})
.put(async function (req, res) {
	let student = await Student.findOrCreate( { id: req.params.student_id } );
	// update info
	student.name = req.body.name || student.name;
	student.surname = req.body.surname || student.surname;
	res.status(200).send(student);
});



module.exports = studentsRoutes;