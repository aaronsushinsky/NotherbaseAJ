module.exports = {
    name: "barrens", // the name of this area that will be used in the url
    dirname: __dirname, //always include
    options: {},
    pois: [
        require("./campground") // one of these for every point of interest
    ]
};