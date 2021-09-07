const { explore, router } = require("notherbase-fs").from(__dirname);

explore("");

explore("keeper");

explore("gate", ["gate"]);

module.exports = router;