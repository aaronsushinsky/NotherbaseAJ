const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
	name: String,
	dateCreated: Number,
    lastModified: Number,
    author: String,
    cover: String,
    binding: String,
    content: String,
    notes: String
});

//convert schema to model
const book = mongoose.model('books', bookSchema);

module.exports = book;