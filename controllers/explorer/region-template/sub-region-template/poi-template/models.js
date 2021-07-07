// This allows us to use Mongoose to connect to MongoDB
const mongoose = require("mongoose");

// This shows the kind of documents we're interacting with in the db
const exampleSchema = new mongoose.Schema({
	name: String,
	data: {}
});

const placeholderSchema = new mongoose.Schema({
	amount: Number,
	data: {}
});

// This tells Mongoose to use the exampleSchema to access the examples collection
// in our db and then exports the model so we can use it.
module.exports = {
	example: mongoose.model('examples', exampleSchema),
	placeholder: mongoose.model('placeholders', placeholderSchema)
};