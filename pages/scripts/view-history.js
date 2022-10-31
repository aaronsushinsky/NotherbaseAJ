const bcrypt = require("bcrypt");

module.exports = async function viewHistory(db, user, body) {
    try {
        const foundAccount = await db.user.findOne({ username: body.org });

        if (foundAccount) {
            let passed = await bcrypt.compare(body.password, foundAccount.password);

            if (passed) {
                console.log("logged in");
                let foundPage = await db.page.findOne({ name: body.name, user: foundAccount._id });
                console.log(foundPage);

                if (foundPage === null) {
                    await db.page.create({
                        name: body.name,
                        type: "local",
                        user: foundAccount._id,
                        data: {
                            tickets: []
                        }
                    });
                    return {
                        status: "ok",
                        tickets: []
                    };
                }
                else {
                    let sendTickets = [];

                    for (let i = 0; i < foundPage.data.tickets.length; i++) {
                        if (foundPage.data.tickets[i].date >= body.dateStart && foundPage.data.tickets[i].date <= body.dateEnd) {
                            sendTickets.push(foundPage.data.tickets[i]);
                        }
                    }

                    return {
                        status: "ok",
                        tickets: sendTickets
                    };
                }
            }
            else {
                return {
                    status: "bad",
                    message: "Access Denied: Password incorrect!"
                };
            }
        }
        else {
            return {
                status: "bad",
                message: "Access Denied: Org not found!"
            };
        }
    } 
    catch(err) {
        return {
            status: "bad",
            err: err,
            message: "Error!"
        }
    }
}