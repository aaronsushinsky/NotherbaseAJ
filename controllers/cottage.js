const express = require("express");
const router = express.Router();

// Import my Data
//const Projects = require("../models/").projects;

// GET Routes
router.get("/", function(req, res) {
    res.render("cottage/index", { style: "cottage" });
});

module.exports = router;