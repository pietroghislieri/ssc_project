var uniqid = require('uniqid');

var examsTable = global.examsTable
if ( examsTable == null )
	examsTable = [];

class exam {

	async save() {
		let matchingexamId = -1;

		if (this.id == undefined) {
			this.id = uniqid();
		}
		else {
			matchingexamId = examsTable.findIndex(e => e.id === this.id)
		}

		// if no matches
		if (matchingexamId == -1)
			examsTable.push(this);
		// if at least one match, replace the first one at index 0 with this
		else
			examsTable[matchingexamId] = this;
		
		return this;
	}

	async delete() {
		let matchingexamId = examsTable.findIndex(e => e.id === this.id)
		if(matchingexamId!=-1) {
			examsTable.splice(matchingexamId, 1);
			return true;
		}
		return false; 
	}

	static remove(criterias) {
		let matchingexamId = examsTable.findIndex(e => e.id === criterias.id)
		if(matchingexamId!=-1) {
			examsTable.splice(matchingexamId, 1);
			return true;
		}
		return false; 
	}

	static async find(criterias) {
		//to be implemented filters exams by criterias e.g. {name:pippo, id:1234}
		let matchingexams = examsTable.filter(u => {
			return criterias.name == undefined ? true : u.name === criterias.name
            &&     criterias.id == undefined ? true : u.id === criterias.id
            &&     criterias.data== undefined? true : u.data=== criterias.data
		});
		return matchingexams;
	}

	static async findOne(criterias) {
		let exams = await this.find(criterias)
		let firstexam = exams.length==0 ? null : exams[0]
		return firstexam;
	}

	// this returns a Promise as much as an async function
	static findOrCreate(criterias) {
		return this.findOne(criterias)
		.then( (exam) => {
			if (exam)
				return exam
			else {
				if (criterias.id == undefined) {
					criterias.id = uniqid();
				}
				examsTable.push(criterias);
				return criterias;
			}
		})
	}

};

module.exports = exam;
