const express = require("express");
const router = express.Router();

const explore = (location) => {
    router.use(`/${location}`, 
        function (req, res, next) {
            if (!req.query.pov) req.query.pov = "none";
            next();
        },
        require(`./${location}/${location}-controller.js`)
    );
}

// explorer regions
explore("forest");
explore("desert");

// start location
router.get("/", function(req, res) {
    res.redirect("/the-front");
});

router.use(function(req, res, next){
    res.render(`${__dirname}/void/index`, 
    {
        siteTitle: "NotherBase",
        user: null
    });
});

module.exports = router;