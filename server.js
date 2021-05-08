// Setup for Express
const express = require("express");
const app = express();
app.set("view engine", "ejs");
// allows us to delete
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
// allows us to use post body data
app.use(express.urlencoded({ extended: false }));
// allows us to get static files like css
app.use(express.static('public'));


// Import my Controller
const controllers = require("./controllers");

app.get("/", function(req, res) {
    res.render("./index.ejs", { style: "main" });
});

app.use("/chat", controllers.chat);

app.use("/projects", controllers.projects);

app.use("/cottage", controllers.cottage);



// Go Off (On)
app.listen(4337);