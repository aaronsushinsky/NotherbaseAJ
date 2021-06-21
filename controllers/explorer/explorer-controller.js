const express = require("express");
const router = express.Router();

router.use("/forest", require("./forest/forest-controller.js"));

router.get("/", function(req, res) {
    res.redirect("/forest/eye-of-the-forest/square");
});

router.get("/*", function(req, res) {
    res.render(`${__dirname}/void/index`, 
    {
        siteTitle: "NotherBase",
        user: null
    });
});

module.exports = router;