// This allows us to use Mongoose to connect to MongoDB
const mongoose = require("mongoose");

const item = new mongoose.Schema({
	name: String,
	shortDescription: String,
	fullDescription: String
});

// This tells Mongoose to use the exampleSchema to access the examples collection
// in our db and then exports the model so we can use it.
module.exports = mongoose.model('items', item);