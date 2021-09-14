require("dotenv").config();

// Setup for Express
const express = require("express");
const app = express();
app.set("view engine", "ejs");

//setup for sockets
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// allows us to delete
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//auth
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authCheck = require('./controllers/authCheck.js');

// allows us to use post body data
app.use(express.urlencoded({ extended: false }));

// allows us to get static files like css
app.use(express.static('public'));

// sets the favicon image
const favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/img/logo.png'));

//start connection to db
require("./models/start-mongoose");

// Import my Controller
const controllers = require("./controllers");

//enable cookies
app.use(session({
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    secret: process.env.SECRET || "won",
    resave: false,
    saveUninitialized: false
}));

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.use("/user", controllers.user);

app.use("/portfolio", controllers.portfolio);

app.use("/chat", controllers.chat(io));

app.use("/item", controllers.item);

app.use("/", authCheck, controllers.explorer);

// Go Off (On)
server.listen(process.env.PORT);