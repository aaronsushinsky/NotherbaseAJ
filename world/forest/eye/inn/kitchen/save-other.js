export default async function (req, user) {
    let spirit = await req.db.Spirit.recallOne("fridge-other", user.id);

    await spirit.commit(req.body.items);
}