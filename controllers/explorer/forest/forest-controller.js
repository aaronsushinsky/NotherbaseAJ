const router = require("express").Router();

router.use("/clearing", require("./clearing/clearing-controller.js"));

router.use("/eye-of-the-forest", require("./eye-of-the-forest/eye-of-the-forest-controller.js"));

module.exports = router;