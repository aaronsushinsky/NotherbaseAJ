const util = require("./pages-util");

module.exports = async function submitTicket(db, user, body) {
    try {
        body.ticket.date = Date.now();
        body.ticket.used = 0;
        body.ticket.quoted = 0;
        body.ticket.resolved = false;
        body.ticket.comments = [];
        body.ticket.attachments = [];
        body.ticket.id = Date.now();

        let result = await util.post(db, user, {
            tickets: [ body.ticket ]
        }, {
            name: "it",
            scope: "local",
            mode: "add"
        });

        if (result === "posted") {
            await db.sendMail.send("wyattsushi@gmail.com", `New IT Request from ${user.username}`, `
                <h1>Request: ${body.ticket.title}</h1> <br>
                Ticket ID: ${body.ticket.id} <br>
                Submitted On: ${new Date(body.ticket.date).getDate()} <br>
                From: ${user.username} <br>
                Description: ${body.ticket.description}
            `)
            return "Request submitted.";
        }
        else return `Error: ${result}`
    }
    catch(err) {
        return err;
    }
}