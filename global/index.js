module.exports = {
    models: {
        start: require("./models/start-mongoose"),
        user: require("../controllers/user/models")
    },
    parts: {
        footer: `${__dirname}/parts/footer.ejs`,
        head: `${__dirname}/parts/head.ejs")`
    }
}