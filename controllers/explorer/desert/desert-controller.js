const router = require("express").Router();

router.use("/wilderness", require("./wilderness/wilderness-controller.js"));

module.exports = router;