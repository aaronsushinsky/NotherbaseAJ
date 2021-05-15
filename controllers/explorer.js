const express = require("express");
const router = express.Router();

const User = require("../models").user;

router.get("/", function(req, res) {
    res.redirect("/forest/eye-of-the-forest/square");
})

router.get("/:region/:subregion/:poi/:spoi", async function(req, res) {
    try {
        const foundAccount = await User.findOne({ _id: req.session.currentUser });

        if (foundAccount) {
            let region = req.params.region;
            let subregion = req.params.subregion;
            let poi = req.params.poi;
            let subPoi = req.params.spoi;

            res.render(`${region}/${subregion}/${poi}/${subPoi}`, {
                style: "main",
                siteTitle: "NotherBase",
                user: foundAccount
            });
        }
        else {
            res.redirect("/user/login");
        }
    }
    catch(err) {
        console.log(err);
    }
});

router.get("/:region/:subregion/:poi/", async function(req, res) {
    try {
        const foundAccount = await User.findOne({ _id: req.session.currentUser });

        if (foundAccount) {
            let region = req.params.region;
            let subregion = req.params.subregion;
            let poi = req.params.poi;
            let subPoi = req.params.spoi;

            res.render(`${region}/${subregion}/${poi}/index`, {
                style: "main",
                siteTitle: "NotherBase",
                user: foundAccount
            });
        }
        else {
            res.redirect("/user/login");
        }
    }
    catch(err) {
        console.log(err);
    }
});


module.exports = router;