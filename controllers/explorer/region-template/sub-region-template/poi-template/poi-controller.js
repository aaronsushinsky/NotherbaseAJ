// This allows us to use routers
const router = require("express").Router();

// This runs our server-side scripts
const exampleScript = require("./server-scripts/example");

// This runs our server-side scripts
const exampleDB = require("./models").example;
const placeholderDB = require("./models").placeholder;

// This is where all the routes for sub-pois go.
/* 
    This route executes when the client requests a GET at 
    /region-template/sub-region-template/poi-template
*/
router.get("/", function(req, res) {
    res.render(`${__dirname}/views/index`, 
    {
        siteTitle: "NotherBase",
        user: null
    });
});

/* 
    This route executes when the client requests a GET at 
    /region-template/sub-region-template/poi-template/sub-poi-template
*/
router.get("/sub-poi-template", function(req, res) {
    res.render(`${__dirname}/views/sub-poi`, 
    {
        siteTitle: "NotherBase",
        user: null
    });
});

// This exports the router
module.exports = router;