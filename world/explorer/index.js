module.exports = {
    name: "explorer",
    dirname: __dirname,
    options: {},
    void: "void",
    regions: [
        require("./forest"),
        require("./desert"),
        require("./coast")
    ]
};