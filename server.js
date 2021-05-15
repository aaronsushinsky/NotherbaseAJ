require("dotenv").config();

// Setup for Express
const express = require("express");
const app = express();
app.set("view engine", "ejs");

// allows us to delete
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//auth
const session = require('express-session');
const authCheck = require('./controllers/authCheck.js');

// allows us to use post body data
app.use(express.urlencoded({ extended: false }));

// allows us to get static files like css
app.use(express.static('public'));


// Import my Controller
const controllers = require("./controllers");

//enable cookies
app.use(session({
    secret: process.env.SECRET || "won",
    resave: false,
    saveUninitialized: false
}));

app.get("/", authCheck, function(req, res) {
    res.render("./index.ejs", { style: "main" });
});

app.use("/user", controllers.user);

app.use("/chat", authCheck, controllers.chat);

app.use("/projects", authCheck, controllers.projects);

app.use("/cottage", authCheck, controllers.cottage);



// Go Off (On)
app.listen(process.env.PORT);