const mongoose = require("mongoose");

//connect mongoose and mongo
mongoose.connect(process.env.MONGODB_URI, { 
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

//handlers
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${process.env.MONGODB_URI}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connected error ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

module.exports = {
    chat: require("./chat/chat"),
    projects: require("./projects/projects"),
    user: require("./user")
}