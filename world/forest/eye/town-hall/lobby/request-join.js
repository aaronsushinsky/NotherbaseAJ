export default async function (req, user) {
    let spirit = await req.db.Spirit.recallOne("group", null, { name: req.body.name });

    if (!Array.isArray(spirit.memory.data.joinRequests)) spirit.memory.data.joinRequests = [];
    spirit.memory.data.joinRequests.push({
        id: user.id,
        note: req.body.note
    });
    await spirit.commit();
}