const router = require("express").Router();

router.use("/wyatts-house", require("./wyatts-house/wyatts-house-controller.js"));

router.use("/tree-house", require("./tree-house/tree-house-controller.js"));

module.exports = router;