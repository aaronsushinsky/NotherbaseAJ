module.exports = {
    name: "tundra", // the name of this region that will be used in the url
    dirname: __dirname, //always include
    options: {},
    areas: [
        require("./barrens"),
        require("./white") // one of these for every area
    ]
};