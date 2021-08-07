const router = require("express").Router();

router.get("/", function(req, res) {
    res.render(`${__dirname}/views/index`, 
    {
        siteTitle: "NotherBase",
        user: req.session.currentUserFull
    });
});

router.get("/clothing-stall", function(req, res) {
    res.render(`${__dirname}/views/clothing-stall`, 
    {
        siteTitle: "NotherBase",
        user: req.session.currentUserFull
    });
});

module.exports = router;