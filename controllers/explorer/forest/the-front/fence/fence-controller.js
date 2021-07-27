const router = require("express").Router();

router.get("/", function(req, res) {
    res.render(`${__dirname}/views/index`, 
    {
        siteTitle: "NotherBase",
        user: null
    });
});

router.get("/keeper", function(req, res) {
    res.render(`${__dirname}/views/keeper`, 
    {
        siteTitle: "NotherBase",
        user: null,
        pov: req.query.pov
    });
});

router.get("/gate", function(req, res) {
    res.render(`${__dirname}/views/gate`, 
    {
        siteTitle: "NotherBase",
        user: null
    });
});

module.exports = router;