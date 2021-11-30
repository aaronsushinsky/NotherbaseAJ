const { explore, router } = require("notherbase-fs").from(__dirname);

explore("", {
    externalStyles: [ "../styles/wilderness" ]
});

explore("hole", {
    externalStyles: [ "../styles/wilderness" ]
});

module.exports = router;