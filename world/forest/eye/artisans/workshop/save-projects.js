export default async function(req, user) {
    let spirit = await req.db.Spirit.recallOne("projects", user.id);

    if (req.body.items) await spirit.commit(req.body.items);
}