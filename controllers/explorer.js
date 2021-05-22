const express = require("express");
const router = express.Router();
const fs = require('fs');

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

            if (await fs.existsSync(`./views/${region}/${subregion}/${poi}/${subPoi}.ejs`)) {
                res.render(`${region}/${subregion}/${poi}/${subPoi}`, {
                    siteTitle: "NotherBase",
                    user: foundAccount
                });
            }
            else {
                res.render(`void/void/void/index`, {
                    siteTitle: "NotherBase",
                    user: foundAccount
                });
            }
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

            if (await fs.existsSync(`./views/${region}/${subregion}/${poi}/index.ejs`)) {
                res.render(`${region}/${subregion}/${poi}/index`, {
                    siteTitle: "NotherBase",
                    user: foundAccount
                });
            }
            else {
                res.render(`void/void/void/index`, {
                    siteTitle: "NotherBase",
                    user: foundAccount
                });
            }
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