import bcrypt from "bcrypt";

export default async function deleteTicket(req, user) {
    let admin = await req.db.User.recallOne(req.body.data.admin);

    if (admin) {
        let passed = await bcrypt.compare(req.body.data.adPassword, admin.memory.data.password);

        if (passed) {
            if (admin.memory.data.authLevels.includes("ITAD")) {
                let org = user;

                let page = await req.db.Spirit.recallOne({
                    scope: "local",
                    parent: org.id,
                    service: "it",
                    route: "/it"
                });

                let pageData = page.memory.data;
                
                for (let i = 0; i < pageData.length; i++) {
                    if (pageData[i].id == req.body.data.ticketID) {
                        pageData.splice(i, 1);

                        await page.commit();

                        return "Ticket Deleted";
                    } 
                }
            }
            else return "Access Denied: Unauthorized!";
        }
        else  return "Access Denied: Password incorrect!";
    }
    else return "Access Denied: Admin not found!";
}