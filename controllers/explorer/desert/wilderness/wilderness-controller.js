// This allows us to use routers.
const router = require("express").Router();

// This is where all the routes for pois go.
router.use("/edge", require("./edge/edge-controller.js"));
router.use("/north", require("./north/north-controller.js"));
router.use("/east", require("./east/east-controller.js"));
router.use("/south", require("./south/south-controller.js"));
router.use("/west", require("./west/west-controller.js"));

// This exports the router.
module.exports = router;