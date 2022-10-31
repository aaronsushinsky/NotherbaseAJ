module.exports = async function submitTicket(db, user, body) {
    try {
        const foundAccount = await user.findOne({ username: body.org });

        if (foundAccount) {
            let foundPage = await db.page.find({ name: body.name, user: foundAccount._id });

            if (foundPage === null) {
                await db.page.create({
                    name: body.name,
                    type: "local",
                    user: foundAccount._id,
                    data: {}
                });

                foundPage = await db.page.find({ name: body.name, user: foundAccount._id });
            }
            
            body.ticket.date = Date.now();
            body.ticket.used = 0;
            body.ticket.quoted = 0;

            foundPage.data.tickets.push(body.ticket);
            foundPage.markModified("data");
            await foundPage.save();
        }
        else {
            return "Access Denied: Org not found!";
        }
    }
    catch(err) {
        return err;
    }
}