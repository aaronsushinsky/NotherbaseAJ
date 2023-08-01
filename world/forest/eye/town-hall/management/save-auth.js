export default async function(req, user) {
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
        if (!which.auth.includes("Leader") || req.body.auth.includes("Leader") || leaderCount > 1) {
            which.auth = req.body.auth;
            await spirit.commit();
        }
    }
}