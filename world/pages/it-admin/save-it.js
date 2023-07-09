export default async (req, user) => {
    let spirit = await req.db.Spirit.recallOne("it", user.id);

    await spirit.commit(req.body.items);
}