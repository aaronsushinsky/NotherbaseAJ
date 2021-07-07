const mongoose = require("mongoose");

const projects = new mongoose.Schema({
	name: String,
	url: String,
	repository: String,
	description: String,
	thumbnail: String,
	cover: String,
	developers: [{ 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "users"
	}]
});

module.exports = mongoose.model('projects', projects);