var uniqid = require('uniqid');

var studentsTable = global.studentsTable
if ( studentsTable == null )
	studentsTable = [];

class Student {

	async save() {
		let matchingStudentId = -1;

		if (this.id == undefined) {
			this.id = uniqid();
		}
		else {
			matchingStudentId = studentsTable.findIndex(e => e.id === this.id)
		}

		// if no matches
		if (matchingStudentId == -1)
			studentsTable.push(this);
		// if at least one match, replace the first one at index 0 with this
		else
			studentsTable[matchingStudentId] = this;
		
		return this;
	}

	async delete() {
		let matchingStudentId = studentsTable.findIndex(e => e.id === this.id)
		if(matchingStudentId!=-1) {
			studentsTable.splice(matchingStudentId, 1);
			return true;
		}
		return false; 
	}

	static remove(criterias) {
		let matchingStudentId = studentsTable.findIndex(e => e.id === criterias.id)
		if(matchingStudentId!=-1) {
			studentsTable.splice(matchingStudentId, 1);
			return true;
		}
		return false; 
	}

	static async find(criterias) {
		//to be implemented filters students by criterias e.g. {name:pippo, id:1234}
		let matchingStudents = studentsTable.filter(u => {
			return criterias.name == undefined ? true : u.name === criterias.name
			&&     criterias.id == undefined ? true : u.id === criterias.id
			&&	   criterias.surname == undefined ? true : u.surname === criterias.surname
		});
		return matchingStudents;
	}

	static async findOne(criterias) {
		let students = await this.find(criterias)
		let firstStudent = students.length==0 ? null : students[0]
		return firstStudent;
	}

	// this returns a Promise as much as an async function
	static findOrCreate(criterias) {
		return this.findOne(criterias)
		.then( (student) => {
			if (student)
				return student
			else {
				if (criterias.id == undefined) {
					criterias.id = uniqid();
				}
				studentsTable.push(criterias);
				return criterias;
			}
		})
	}

};

module.exports = Student;
