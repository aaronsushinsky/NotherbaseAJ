const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
    res.render(`${__dirname}/views/index`, {
        siteTitle: "Wyatt's Portfolio"
    });
});

module.exports = router;