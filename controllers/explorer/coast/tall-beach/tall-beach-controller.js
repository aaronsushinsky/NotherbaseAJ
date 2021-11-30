const router = require("express").Router();

router.use("/nono-cove", require("./nono-cove/nono-cove-controller.js"));

module.exports = router;