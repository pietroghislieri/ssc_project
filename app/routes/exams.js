const express = require('express');
const Exam   = require('../models/exam');

const examsRoutes = express.Router(); 

examsRoutes.route('/')
.get(async function(req, res) {
	let exams = await Exam.find({});
	res.json(exams);
})
.post(async function (req, res) {
	var exam = new Exam();

	if(req.body.name == undefined || req.body.data == undefined)
		res.status(400).send({message: 'Bad syntax: missing parameters'})
	else{
		exam.name = req.body.name;
		exam.data = req.body.data;
		saved = await exam.save()
		res.status(201).send(saved)
	}
})

examsRoutes.route('/:exam_id')
.get(async function(req, res) {
	let exam_id = req.params.exam_id
	if ( exam_id == 'last' )
		exam_id = req.exam.id
	let exam = await Exam.findOne( { id: exam_id } );
	res.json(exam);
})
.delete(function (req, res) {
	if( Exam.remove({ id: req.params.exam_id }) )
		res.status(204).send({ message: 'Successfully deleted' });
	else
		res.status(404).send({ message: 'invalid id' });
})
.put(async function (req, res) {
	let exam = await Exam.findOrCreate( { id: req.params.exam_id } );
	// update info
	exam.name = req.body.name || exam.name;
	exam.data = req.body.data || exam.data;
	
	res.status(200).send(exam);
});



module.exports = examsRoutes;