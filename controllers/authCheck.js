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
                req.session.currentUserFull = null;
                res.redirect("/the-front");
            }
        }
        else{
            res.redirect("/the-front");
        }
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = authCheck;