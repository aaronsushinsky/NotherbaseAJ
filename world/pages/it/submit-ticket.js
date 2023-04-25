export default async function submitTicket(req, user) {
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

    let page = await req.db.Spirit.recallOrCreate({
        scope: "local",
        parent: user.id,
        service: "it",
        route: "/it"
    }, {}, []);

    let pageData = page.memory.data;

    pageData.push(newTicket);
    await page.commit();

    await req.db.SendMail.send("wyattsushi@gmail.com", `New IT Request from ${user.memory.data.username}`, `
        <h1>Request: ${newTicket.title}</h1> <br>
        Ticket ID: ${newTicket.id} <br>
        Submitted On: ${new Date(newTicket.date).getDate()} <br>
        From: ${user.memory.data.username} <br>
        Description: ${newTicket.description}
    `);

    return "Request submitted.";
}