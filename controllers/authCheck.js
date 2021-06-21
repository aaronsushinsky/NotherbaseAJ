const User = require("./user/models.js").user;

const authCheck = async function authCheck(req, res, next){
    try {
        if (req.session.currentUser) {
            const foundAccount = await User.findById(req.session.currentUser);
    
            if (foundAccount) {
                req.session.currentUserFull = foundAccount;
                next();
            }
            else {
                console.log("User not found in db! Redirecting!");
                res.redirect("/user/login");
            }
        }
        else{
            console.log("User not logged in! Redirecting!");
            res.redirect("/user/login");
        }
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = authCheck;