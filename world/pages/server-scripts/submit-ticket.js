export default async function submitTicket(req, user) {
    try {
        let newTicket = {
            date: Date.now(),
            used: 0,
            quoted: 0,
            resolved: false,
            comments: [],
            attachments: [],
            id: Date.now(),
            ...req.body.data.ticket
        }

        req.body.scope = "local";
        req.body.parent = user.memory._id;
        req.body.service = "it";
        req.body.route = "/it";

        let page = new req.db.Spirit(req.body);
        let pageData = await page.recall();

        if (pageData) {
            pageData.tickets.push(newTicket);
            await page.commit();
        }
        else {
            await page.create({
                tickets: [ newTicket ]
            });
        }

        await req.db.SendMail.send("wyattsushi@gmail.com", `New IT Request from ${user.memory.data.username}`, `
            <h1>Request: ${newTicket.title}</h1> <br>
            Ticket ID: ${newTicket.id} <br>
            Submitted On: ${new Date(newTicket.date).getDate()} <br>
            From: ${user.memory.data.username} <br>
            Description: ${newTicket.description}
        `);

        return "Request submitted.";
    }
    catch(err) {
        return err;
    }
}