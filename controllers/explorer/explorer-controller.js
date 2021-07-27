const express = require("express");
const router = express.Router();

const explore = (location) => {
    router.use(`/${location}`, require(`./${location}/${location}-controller.js`));
}

// explorer regions
explore("forest");

// start location
router.get("/", function(req, res) {
    res.redirect("/forest/the-front/fence");
});


// for requests to pages that don't exist
router.get("/*", function(req, res) {
    res.render(`${__dirname}/void/index`, 
    {
        siteTitle: "NotherBase",
        user: null
    });
});

module.exports = router;