// This allows us to use routers
const router = require("express").Router();

router.get("/", function(req, res) {
    res.render(`${__dirname}/views/index`, 
    { 
        siteTitle: "NotherBase | The Front",
        info: "",
        color: "green" 
    });
});

router.get("/keeper", function(req, res) {
    res.render(`${__dirname}/views/keeper`, 
    { 
        siteTitle: "NotherBase | The Front",
        info: "",
        color: "green",
        pov: req.query.pov
    });
});

router.get("/gate", function(req, res) {
    res.render(`${__dirname}/views/gate`, 
    { 
        siteTitle: "NotherBase | The Front",
        info: "",
        color: "green",
        loggedIn: req.session.currentUserFull
    });
});

// This exports the router
module.exports = router;