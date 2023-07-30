export default async function(req, user) {
    let spirit = await req.db.Spirit.recallOne("group", null, null, req.body.groupID);

    for (let i = 0; i < spirit.memory.data.members.length; i++) {
        if (spirit.memory.data.members[i].id == req.body.userID) {
            if (spirit.memory.data.members[i].id == `${user.id}`) return "self-error";
            else {
                spirit.memory.data.members.splice(i, 1);
                await spirit.commit();
                return "removed";
            }
        }
    }
}