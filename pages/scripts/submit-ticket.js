module.exports = async function submitTicket(db, user, body) {
    try {
        let foundPage = await db.page.find({ name: body.name, user: user });

        if (foundPage === null) {
            await db.page.create({
                name: body.name,
                type: "local",
                user: user,
                data: {}
            });

            foundPage = await db.page.find({ name: body.name, user: user });
        }
        
        body.ticket.date = Date.now();
        foundPage.data.tickets.push(body.ticket);
        foundPage.markModified("data");
        await foundPage.save();
    } 
    catch(err) {
        return err;
    }
}