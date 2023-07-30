export default async function(req, user) {
    let spirit = await req.db.Spirit.recallOne("group", null, null, req.body.groupID);

    let leader = null;
    let joiner = null;
    
    for (let i = 0; i < spirit.memory.data.members.length; i++) {
        if (spirit.memory.data.members[i].id == user.id) leader = spirit.memory.data.members[i];
    }

    if (leader.auth.includes("Leader")) {
        for (let i = 0; i < spirit.memory.data.joinRequests.length; i++) {
            if (spirit.memory.data.joinRequests[i].id == req.body.userID) {
                spirit.memory.data.joinRequests.splice(i, 1);
                await spirit.commit();

                return "declined";
            }
        }

        return "not-found-error";
    }
    else return "auth-error";
}