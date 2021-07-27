// This allows us to use routers.
const router = require("express").Router();

// This is where all the routes for pois go.
router.use("/side", require("./side/side-controller.js"));

// This exports the router.
module.exports = router;