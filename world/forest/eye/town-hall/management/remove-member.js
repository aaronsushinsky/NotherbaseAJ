export default async function(req, user) {
    let spirit = await req.db.Spirit.recallOne("group", null, null, req.body.groupID);

    let leader = null;
    let removal = null;
    let which = null;
    
    for (let i = 0; i < spirit.memory.data.members.length; i++) {
        if (spirit.memory.data.members[i].id == req.body.userID) {
            removal = spirit.memory.data.members[i];
            which = i;
        }
        if (spirit.memory.data.members[i].id == user.id) leader = spirit.memory.data.members[i];
    }

    if (leader.auth.includes("Leader")) {
        if (removal.id == leader.id) return "self-error";
        else {
            spirit.memory.data.members.splice(which, 1);
            await spirit.commit();
            return "removed";
        }
    }
    else if (removal.id == leader.id) {
        spirit.memory.data.members.splice(which, 1);
        await spirit.commit();
        return "removed";
    }
    else return "auth-error";
}