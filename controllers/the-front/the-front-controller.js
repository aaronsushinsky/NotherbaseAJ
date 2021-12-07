// This allows us to use routers
const router = require("express").Router();

router.get("/", function(req, res) {
    res.render(`${__dirname}/views/index`, 
    { 
        siteTitle: "NotherBase | The Front",
        user: req.session.currentUserFull
    });
});

router.get("/keeper", function(req, res) {
    res.render(`${__dirname}/views/keeper`, 
    { 
        siteTitle: "NotherBase | The Front",
        pov: req.query.pov,
        user: req.session.currentUserFull
    });
});

router.get("/gate", function(req, res) {
    res.render(`${__dirname}/views/gate`, 
    { 
        siteTitle: "NotherBase | The Front",
        loggedIn: req.session.currentUserFull,
        user: req.session.currentUserFull
    });
});

router.get("/around", function(req, res) {
    res.render(`${__dirname}/views/around`, 
    { 
        siteTitle: "NotherBase | The Front",
        loggedIn: req.session.currentUserFull,
        user: req.session.currentUserFull,
        query: req.query
    });
});

// This exports the router
module.exports = router;