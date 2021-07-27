// This allows us to use routers
const router = require("express").Router();

// This is where all the routes for sub-pois go.
router.get("/", function(req, res) {
    res.render(`${__dirname}/views/index`, 
    {
        siteTitle: "NotherBase",
        user: null
    });
});

// This exports the router
module.exports = router;