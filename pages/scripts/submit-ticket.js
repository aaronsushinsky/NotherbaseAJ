const bcrypt = require("bcrypt");

module.exports = async function submitTicket(db, user, body) {
    try {
        const foundAccount = await db.user.findOne({ username: body.org });

        if (foundAccount) {
            let passed = await bcrypt.compare(body.password, foundAccount.password);

            if (passed) {
                let foundPage = await db.page.findOne({ name: body.name, user: foundAccount._id });

                if (foundPage === null) {
                    await db.page.create({
                        name: body.name,
                        type: "local",
                        user: foundAccount._id,
                        data: {
                            tickets: []
                        }
                    });

                    foundPage = await db.page.findOne({ name: body.name, user: foundAccount._id });
                }
                
                body.ticket.date = Date.now();
                body.ticket.used = 0;
                body.ticket.quoted = 0;
                body.ticket.resolved = false;
                body.ticket.attachments = [];

                foundPage.data.tickets.push(body.ticket);
                foundPage.markModified("data");
                await foundPage.save();

                return "Request submitted."
            }
            else {
                return "Access Denied: Password incorrect!";
            }
        }
        else {
            return "Access Denied: Org not found!";
        }
    }
    catch(err) {
        return err;
    }
}