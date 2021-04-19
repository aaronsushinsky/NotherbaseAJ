const mongoose = require("mongoose");

//get schema template
const Schema = mongoose.Schema;
const projectSchema = new Schema({
	name: String,
	url: String
}, {collection: "projects"});

//convert schema to model
const project = mongoose.model('Project', projectSchema);

module.exports = project;