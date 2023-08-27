export default async function (req, user) {
    let spirit = await req.db.Spirit.recallOne("fridge-freezer", user.id);

    await spirit.commit(req.body.items);
}