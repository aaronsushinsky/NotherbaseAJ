// This allows us to use Mongoose to connect to MongoDB
const mongoose = require("mongoose");

// This shows the kind of documents we're interacting with in the db
const contact = new mongoose.Schema({
	user: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "users",
		required: true
	},
	location: String,
	content: String
});

// This tells Mongoose to use the exampleSchema to access the examples collection
// in our db and then exports the model so we can use it.
module.exports = mongoose.model('contacts', contact);