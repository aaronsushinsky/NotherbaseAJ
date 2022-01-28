module.exports = {
    name: "wilderness",
    dirname: __dirname,
    options: {},
    pois: [
        require("./edge"),
        require("./north"),
        require("./east"),
        require("./south"),
        require("./west"),
        require("./whale-carcass")
    ]
};