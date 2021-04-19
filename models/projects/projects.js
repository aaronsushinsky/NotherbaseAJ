const mongoose = require("mongoose");
//connec to mongo
const connectionString = 'mongodb://localhost:27017/projects';

//connect mongoose and mongo
mongoose.connect(connectionString, { 
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

//handlers
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${connectionString}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connected error ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

//get schema template
const Schema = mongoose.Schema;
const projectSchema = new Schema({
	name: String,
	url: String
});

//convert schema to model
const project = mongoose.model('Project', projectSchema);

module.exports = project;