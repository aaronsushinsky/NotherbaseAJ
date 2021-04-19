const mongoose = require("mongoose");

//get schema template
const Schema = mongoose.Schema;
const chatSchema = new Schema({
	text: String,
    date: Number
}, {collection: "chat"});

//convert schema to model
const project = mongoose.model('Chat', chatSchema);

module.exports = project;