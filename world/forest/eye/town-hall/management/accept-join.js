export default async function(req, user) {
    let spirit = await req.db.Spirit.recallOne("group", null, null, req.body.groupID);

    let leader = null;
    let joiner = null;
    
    for (let i = 0; i < spirit.memory.data.members.length; i++) {
        if (spirit.memory.data.members[i].id == user.id) leader = spirit.memory.data.members[i];
        if (spirit.memory.data.members[i].id == req.body.userID) joiner = spirit.memory.data.members[i];
    }

    if (leader.auth.includes("Leader")) {
        if (req.body.userID == leader.id) return "self-error";
        else if (joiner) return "redundant-error";
        else {
            for (let i = 0; i < spirit.memory.data.joinRequests.length; i++) {
                if (spirit.memory.data.joinRequests[i].id == req.body.userID) {
                    spirit.memory.data.members.push({
                        id: spirit.memory.data.joinRequests[i].id,
                        auth: []
                    });
                    spirit.memory.data.joinRequests.splice(i, 1);
                    await spirit.commit();

                    return "accepted";
                }
            }

            return "not-found-error";
        }
    }
    else return "auth-error";
}