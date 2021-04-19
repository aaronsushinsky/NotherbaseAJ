const express = require("express");
const router = express.Router();

// Import my Data
const Projects = require("../models/projects/projects")

// GET Routes
router.get("/", function(req, res) {
    Projects.find({},  function(err, p) {
        const context = { projects: p };
        res.render("projects/index", context);
    });
});
router.get("/new", function(req, res) {
    res.render("projects/new");
});
router.get("/:id", function(req, res) {
    Projects.findById(req.params.id,  function(err, p) {
        const context = { project: p };
        res.render("projects/show", context);
    });
});
router.get("/:id/edit", function(req, res) {
    Projects.findById(req.params.id, function(err, p) {
        const context = { project: p };
        res.render("projects/edit", context);
    });
});

// POST Routes
router.post("/", function(req, res) {
    Projects.create({
        name: req.body.name, 
        url: req.body.url
    })
    res.redirect("/");
});

// PUT Routes
router.put("/:id", function(req, res) {
    Projects.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { url: req.body.url },
        function(err, updatedProject) {
            res.redirect(`/${req.params.id}`);
        }
    );
});

// DELETE Routes
router.delete("/:id", function(req, res) {
    Projects.findByIdAndDelete(
        req.params.id,
        (err, deletedArticle)=>{
            res.render("projects/delete");
        }
    );
});

module.exports = router;