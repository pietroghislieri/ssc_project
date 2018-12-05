var uniqid = require('uniqid');

var professorsTable = global.professorsTable
if ( professorsTable == null )
	professorsTable = [];

class Professor {

	async save() {
		let matchingProfessorId = -1;

		if (this.id == undefined) {
			this.id = uniqid();
		}
		else {
			matchingProfessorId = professorsTable.findIndex(e => e.id === this.id)
		}

		// if no matches
		if (matchingProfessorId == -1)
			professorsTable.push(this);
		// if at least one match, replace the first one at index 0 with this
		else
			professorsTable[matchingProfessorId] = this;
		
		return this;
	}

	async delete() {
		let matchingProfessorId = professorsTable.findIndex(e => e.id === this.id)
		if(matchingProfessorId!=-1) {
			professorsTable.splice(matchingProfessorId, 1);
			return true;
		}
		return false; 
	}

	static remove(criterias) {
		let matchingProfessorId = professorsTable.findIndex(e => e.id === criterias.id)
		if(matchingProfessorId!=-1) {
			professorsTable.splice(matchingProfessorId, 1);
			return true;
		}
		return false; 
	}

	static async find(criterias) {
		//to be implemented filters professors by criterias e.g. {name:pippo, id:1234}
		let matchingProfessors = professorsTable.filter(u => {
			return criterias.name == undefined ? true : u.name === criterias.name
			&&     criterias.id == undefined ? true : u.id === criterias.id
			&&	   criterias.surname == undefined ? true : u.surname === criterias.surname
			&&	   criterias.password == undefined ? true : u.password === criterias.password
		});
		return matchingProfessors;
	}

	static async findOne(criterias) {
		let professors = await this.find(criterias)
		let firstProfessor = professors.length==0 ? null : professors[0]
		return firstProfessor;
	}

	// this returns a Promise as much as an async function
	static findOrCreate(criterias) {
		return this.findOne(criterias)
		.then( (professor) => {
			if (professor)
				return professor
			else {
				if (criterias.id == undefined) {
					criterias.id = uniqid();
				}
				professorsTable.push(criterias);
				return criterias;
			}
		})
	}

};

module.exports = Professor;
