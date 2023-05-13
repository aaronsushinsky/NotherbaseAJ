export default async function viewHistory(req, user) {
    let page = await req.db.Spirit.recallOne("it", user.id);

    let pageData = page.memory.data;

    let sendTickets = [];
    let afterDate = new Date(req.body.dateStart + "T00:00");
    let beforeDate = new Date(req.body.dateEnd + "T00:00");

    for (let i = 0; i < pageData.length; i++) {
        if (!pageData[i].id) pageData[i].id = Date.now();
        if (!pageData[i].comments) pageData[i].comments = [];

        if (pageData[i].date >= afterDate && pageData[i].date <= beforeDate) {
            sendTickets.push(pageData[i]);
        }
    }

    return sendTickets;
}