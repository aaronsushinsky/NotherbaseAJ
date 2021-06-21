const mongoose = require("mongoose");

//get schema template
const Schema = mongoose.Schema;
const projectSchema = new Schema({
	name: String,
	url: String
});

module.exports = mongoose.model('projects', projectSchema);