const router = require("express").Router();

router.use("/square", require("./square/square-controller.js"));
router.use("/inn", require("./inn/inn-controller.js"));
router.use("/smith", require("./smith/smith-controller.js"));

module.exports = router;