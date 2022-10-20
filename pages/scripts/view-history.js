module.exports = async function viewHistory(db, user, body) {
    try {
        const foundAccount = await user.findOne({ email: req.body.email });

        if (foundAccount) {
            if (await bcrypt.compare(req.body.password, foundAccount.password)) {
                req.session.currentUser = foundAccount._id;

                res.status(200).send("Login successful!");
            }
            else {
                res.status(401).send("Login Failed: Password incorrect!");
            }
        }

        
        let foundPage = await db.page.find({ name: body.name, user: user });

        if (foundPage === null) {
            await db.page.create({
                name: body.name,
                type: "local",
                user: user,
                data: {}
            });

            return `No history found! ${body.name}:${user.length}`;
        }
        else {
            return foundPage.data.tickets;
        }
    } 
    catch(err) {
        return err;
    }
}