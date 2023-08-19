export default async function (req, user) {
    let spirit = await req.db.Spirit.recallOne("bible-research-persons", user.id);
    await spirit.commit(req.body.items);
}