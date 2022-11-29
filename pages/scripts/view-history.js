const util = require("./pages-util");

module.exports = async function viewHistory(db, user, body) {
    try {
        let result = await util.get(db, user, {}, {
            name: "it",
            scope: "local"
        });

        let sendTickets = [];
        let afterDate = new Date(body.dateStart + "T00:00");
        let beforeDate = new Date(body.dateEnd + "T00:00");

        for (let i = 0; i < result.data.tickets.length; i++) {
            if (!result.data.tickets[i].id) result.data.tickets[i].id = Date.now();
            if (!result.data.tickets[i].comments) result.data.tickets[i].comments = [];

            if (result.data.tickets[i].date >= afterDate && result.data.tickets[i].date <= beforeDate) {
                sendTickets.push(result.data.tickets[i]);
            }
        }

        return {
            status: "ok",
            tickets: sendTickets
        };
    }
    catch(err) {
        return {
            status: "bad",
            message: "Error!",
            err: err
        };
    }
}