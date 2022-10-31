module.exports = async function viewHistory(db, user, body) {
    try {
        const foundAccount = await user.findOne({ _id: user });

        if (foundAccount) {
            let passed = await bcrypt.compare(req.body.password, foundAccount.password);
            if (passed) {
                let foundPage = await db.page.find({ name: body.name, user: user });

                if (foundPage === null) {
                    await db.page.create({
                        name: body.name,
                        type: "local",
                        user: user,
                        data: {}
                    });

                    return `No history found!`;
                }
                else if (foundPage.data.tickets.length > 0) {
                    return foundPage.data.tickets;
                }
                else return `No history found!`;
            }
            else {
                return "Access Denied: Password incorrect!";
            }
        }
    } 
    catch(err) {
        return err;
    }
}