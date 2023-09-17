export default async function(req, user) {
    if (user.id) {
        let spirit = await req.db.Spirit.recallOne("group", null, null, req.body.groupID);
    
        let leader = null;
        let which = null;
        let leaderCount = 0;
        
        for (let i = 0; i < spirit.memory.data.members.length; i++) {
            if (spirit.memory.data.members[i].id == req.body.userID) which = spirit.memory.data.members[i];
            if (spirit.memory.data.members[i].id == user.id) leader = spirit.memory.data.members[i];
            if (spirit.memory.data.members[i].auth.includes("Leader")) leaderCount++;
        }
    
        if (!Array.isArray(leader?.auth)) leader.auth = [];
        if (leader.auth.includes("Leader")) {
            if (req.body.demote) {
                if (req.body.title == "Leader" && leaderCount < 2) {
                    if (which == leader) return "self-error";
                    else return "leader-count-error";
                }
                else {
                    let index = which.auth.indexOf(req.body.title);
                    if (index !== -1) {
                        which.auth.splice(index, 1);
                    }

                    await spirit.commit();
                    return "demoted";
                }
            }
            else {
                let index = which.auth.indexOf(req.body.title);
                if (index == -1) {
                    which.auth.push(req.body.title);
                    await spirit.commit();
                    return "promoted";
                }
                else return "redundant";
            }
        }
        else return "auth-error";
    }
    else return "login-error";
}