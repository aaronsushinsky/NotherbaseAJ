module.exports = {
    name: "forest",
    dirname: __dirname,
    options: {},
    areas: [
        require("./clearing"),
        require("./road"),
        require("./pond"),
        require("./eye-of-the-forest")
    ]
};