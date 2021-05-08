const mongoose = require("mongoose");
//connect to mongo
const connectionString = 'mongodb://localhost:27017/nother_base';

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

module.exports = {
    chat: require("./chat/chat"),
    projects: require("./projects/projects")
}