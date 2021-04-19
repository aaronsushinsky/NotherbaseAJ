const mongoose = require("mongoose");

//get schema template
const Schema = mongoose.Schema;
const chatSchema = new Schema({
    name: String,
	text: String,
    date: Number
});

//convert schema to model
const project = mongoose.model('chat', chatSchema);

module.exports = project;