const router = require("express").Router();

router.use("/wyatts-house", require("./wyatts-house/wyatts-house-controller.js.js"));

module.exports = router;