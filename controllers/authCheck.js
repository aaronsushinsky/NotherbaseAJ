const authCheck = function authCheck(req, res, next){
    if (req.session.currentUser) {
        next();
    }
    else{
        console.log("User not logged in! Redirecting!");
        res.redirect("/user/login");
    }
}

module.exports = authCheck;