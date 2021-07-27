const router = require("express").Router();

router.use("/clearing", require("./clearing/clearing-controller.js"));
router.use("/the-front", require("./the-front/the-front-controller.js"));
router.use("/road", require("./road/road-controller.js"));
router.use("/pond", require("./pond/pond-controller.js"));

router.use("/eye-of-the-forest", require("./eye-of-the-forest/eye-of-the-forest-controller.js"));

module.exports = router;