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
                res.redirect("/user/login");
            }
        }
        else{
            res.redirect("/user/login");
        }
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = authCheck;