export default async function (req, user) {
    let spirit = await req.db.Spirit.recallOne("fridge-meats", user.id);

    await spirit.commit(req.body.items);
}