// This allows us to use routers
const router = require("express").Router();

// This is where all the routes for subregions go
router.use("/fence", require("./fence/fence-controller.js"));

// This exports the router
module.exports = router;