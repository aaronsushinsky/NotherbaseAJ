export default async function viewHistory(req, user) {
    try {
        req.body.scope = "local";
        req.body.parent = user.memory._id;
        req.body.service = "it";
        req.body.route = "/it";

        let page = new req.db.Spirit(req.body);
        let pageData = await page.recall();

        let sendTickets = [];
        let afterDate = new Date(req.body.data.dateStart + "T00:00");
        let beforeDate = new Date(req.body.data.dateEnd + "T00:00");

        for (let i = 0; i < pageData.tickets.length; i++) {
            if (!pageData.tickets[i].id) pageData.tickets[i].id = Date.now();
            if (!pageData.tickets[i].comments) pageData.tickets[i].comments = [];

            if (pageData.tickets[i].date >= afterDate && pageData.tickets[i].date <= beforeDate) {
                sendTickets.push(pageData.tickets[i]);
            }
        }

        return sendTickets;
    }
    catch(err) {
        return err;
    }
}