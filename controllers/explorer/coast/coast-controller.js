const router = require("express").Router();

router.use("/tall-beach", require("./tall-beach/tall-beach-controller.js"));

module.exports = router;