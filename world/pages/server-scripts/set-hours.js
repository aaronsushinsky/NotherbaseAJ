import bcrypt from "bcrypt";

export default async function setHours(req, user) {
    try {
        let admin = new req.db.User("user", req.body.data.admin);
        let adminData = await admin.recall();

        if (adminData) {
            let passed = await bcrypt.compare(req.body.data.adPassword, adminData.password);

            if (passed) {
                if (adminData.authLevels.includes("ITAD")) {
                    let org = user;

                    req.body.parent = org.memory._id;
                    req.body.service = "it";
                    req.body.route = "/it";
                    req.body.scope = "local";

                    let page = new req.db.Spirit(req.body);
                    let pageData = await page.recall();

                    for (let i = 0; i < pageData.tickets.length; i++) {
                        if (pageData.tickets[i].id == req.body.data.ticketID) {
                            pageData.tickets[i].used = parseInt(req.body.data.used);
                            pageData.tickets[i].quoted = parseInt(req.body.data.quoted);

                            await page.commit();

                            return "Ticket Updated";
                        } 
                    }
                }
                else return "Access Denied: Unauthorized!";
            }
            else  return "Access Denied: Password incorrect!";
        }
        else return "Access Denied: Admin not found!";
    } 
    catch(err) {
        console.log(err);
        return "Error";
    }
}