const router = require("express").Router();

router.use("/square", require("./square/square-controller.js"));

module.exports = router;