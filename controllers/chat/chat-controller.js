const express = require("express");
const router = express.Router();

const getRouterWithIO = function getRouterWithIO(io) {
    router.post("/", async function(req, res) {
        try {
            //const foundAccount = await User.findOne({ _id: req.session.currentUser });
            
            if (req.session.currentUserFull) {
                io.to(req.body.room).emit('chat message', {
                    name: req.session.currentUserFull.username,
                    time: Date.now(),
                    text: req.body.text
                });

                res.status(200).end();
            }
            else {
                res.redirect("user/login");
            }
        }
        catch(err) {
            console.log(err);
        }
    });

    return router;
}

module.exports = getRouterWithIO;