// This allows us to use routers
const router = require("express").Router();

// This is where all the routes for subregions go
router.use("/sub-region", require("./sub-region/sub-region-controller.js.js"));

// This exports the router
module.exports = router;