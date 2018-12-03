var uniqid = require('uniqid');

var assignmentsTable = global.assignmentsTable
if ( assignmentsTable == null )
	assignmentsTable = [];

class Assignment {

	async save() {
		let matchingassignmentId = -1;

		if (this.id == undefined) {
			this.id = uniqid();
		}
		else {
			matchingassignmentId = assignmentsTable.findIndex(e => e.id === this.id)
		}

		// if no matches
		if (matchingassignmentId == -1)
			assignmentsTable.push(this);
		// if at least one match, replace the first one at index 0 with this
		else
			assignmentsTable[matchingassignmentId] = this;
		
		return this;
	}

	async delete() {
		let matchingassignmentId = assignmentsTable.findIndex(e => e.id === this.id)
		if(matchingassignmentId!=-1) {
			assignmentsTable.splice(matchingassignmentId, 1);
			return true;
		}
		return false; 
	}

	static remove(criterias) {
		let matchingassignmentId = assignmentsTable.findIndex(e => e.id === criterias.id)
		if(matchingassignmentId!=-1) {
			assignmentsTable.splice(matchingassignmentId, 1);
			return true;
		}
		return false; 
	}

	static async find(criterias) {
		//to be implemented filters assignments by criterias e.g. {name:pippo, id:1234}
		let matchingassignments = assignmentsTable.filter(u => {
			return criterias.name == undefined ? true : u.name === criterias.name
            &&     criterias.id == undefined ? true : u.id === criterias.id
            &&     criterias.data_in == undefined? true : u.data_in=== criterias.data_in
            &&     criterias.data_fin == undefined ? true : u.data_fin === criterias.data_fin
		});
		return matchingassignments;
	}

	static async findOne(criterias) {
		let assignments = await this.find(criterias)
		let firstassignment = assignments.length==0 ? null : assignments[0]
		return firstassignment;
	}

	// this returns a Promise as much as an async function
	static findOrCreate(criterias) {
		return this.findOne(criterias)
		.then( (assignment) => {
			if (assignment)
				return assignment
			else {
				if (criterias.id == undefined) {
					criterias.id = uniqid();
				}
				assignmentsTable.push(criterias);
				return criterias;
			}
		})
	}

};

module.exports = Assignment;
