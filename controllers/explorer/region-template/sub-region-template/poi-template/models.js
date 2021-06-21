// This allows us to use Mongoose to connect to MongoDB
const mongoose = require("mongoose");

// This shows the kind of documents we're interacting with in the db
const exampleSchema = new mongoose.Schema({
	name: String,
	data: {}
});

// This tells Mongoose to use the exampleSchema to access the examples collection
// in our db and then exports the model so we can use it.
module.exports = mongoose.model('examples', exampleSchema);