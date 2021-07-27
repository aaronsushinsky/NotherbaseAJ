const router = require("express").Router();

router.get("/", function(req, res) {
    res.render(`${__dirname}/views/index`, 
    {
        siteTitle: "NotherBase",
        user: req.session.currentUserFull
    });
});

router.get("/lobby", async function(req, res) {
    res.render(`${__dirname}/views/lobby`, 
    {
        siteTitle: "NotherBase",
        user: req.session.currentUserFull,
        pov: req.query.pov
    });
});

router.get("/kitchen", async function(req, res) {
    res.render(`${__dirname}/views/kitchen`, 
    {
        siteTitle: "NotherBase",
        user: req.session.currentUserFull
    });
});

router.get("/upstairs", async function(req, res) {
    res.render(`${__dirname}/views/upstairs`, 
    {
        siteTitle: "NotherBase",
        user: req.session.currentUserFull
    });
});

module.exports = router;