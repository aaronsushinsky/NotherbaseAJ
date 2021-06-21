const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
	name: String,
	data: {}
});

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

module.exports = {
	house: mongoose.model('wyatts-house', houseSchema),
	books: mongoose.model('books', bookSchema)
}