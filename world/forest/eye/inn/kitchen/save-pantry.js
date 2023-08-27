export default async function (req, user) {
    let spirit = await req.db.Spirit.recallOne("pantry", user.id);

    await spirit.commit(req.body.items);
}