const express = require('express');
const Professor   = require('../models/professor');

const professorsRoutes = express.Router(); 

professorsRoutes.route('/')
.get(async function(req, res) {
	let professors = await Professor.find({});
	res.json(professors);
})
.post(async function (req, res) {
	var professor = new Professor();
	if(req.body.name == undefined || req.body.surname == undefined){
		res.status(400).send({message: 'Bad syntax: missing parameters'})
	}
	else{
		professor.name = req.body.name;
		professor.surname = req.body.surname;
		professor.admin=true;
		saved = await professor.save()
		res.status(201).send(saved)
	}
})

professorsRoutes.route('/:professor_id')
.get(async function(req, res) {
	let professor_id = req.params.professor_id
	if ( professor_id == 'me' )
		professor_id = req.professor.id
	let professor = await Professor.findOne( { id: professor_id } );
	res.json(professor);
})
.delete(function (req, res) {
	if( Professor.remove({ id: req.params.professor_id }) )
		res.status(204).send({ message: 'Successfully deleted' });
	else
		res.status(404).send({ message: 'invalid id' });
})
.put(async function (req, res) {
	let professor = await Professor.findOrCreate( { id: req.params.professor_id } );
	// update info
	professor.name = req.body.name || professor.name;
	professor.surname = req.body.surname || professor.surname;
	res.status(200).send(professor);
});



module.exports = professorsRoutes;