const mongoose = require("mongoose");

//convert schema to model
const user = mongoose.model('users',
    new mongoose.Schema({
        username: String,
        password: String,
        email: String,
        coin: Number,
        home: String,
        authLevels: [ String ],
        location: String
    })
);

module.exports = user;