const router = require("express").Router();

const houseDB = require("./models.js").house;
const gardenScript = require("./server-scripts/garden.js");

router.get("/", function(req, res) {
    res.render(`${__dirname}/views/index`, 
    {
        siteTitle: "NotherBase",
        user: null
    });
});

router.get("/livingroom", function(req, res) {
    res.render(`${__dirname}/views/livingroom`, 
    {
        siteTitle: "NotherBase",
        user: null
    });
});

router.get("/laylas-room", function(req, res) {
    res.render(`${__dirname}/views/laylas-room`, 
    {
        siteTitle: "NotherBase",
        user: null
    });
});

module.exports = router;