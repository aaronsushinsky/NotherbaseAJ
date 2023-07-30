export default async function(req, user) {
    let spirit = await req.db.Spirit.recallOne("group", null, null, req.body.groupID);

    for (let i = 0; i < spirit.memory.data.members.length; i++) {
        if (spirit.memory.data.members[i].id == req.body.userID) {
            spirit.memory.data.members[i].auth = req.body.auth;
            await spirit.commit();
        }
    }
}