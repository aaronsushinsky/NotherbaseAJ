const path = require('path');
const notherbase = require("notherbase-fs");

notherbase.start(
    path.resolve(__dirname, "world/explorer"),
    path.resolve(__dirname, "world/explorer/void"),
    path.resolve(__dirname, "world/the-front"),
    path.resolve(__dirname, "pages")
);