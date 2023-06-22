export default async (req, user) => {
    let spirit = await req.db.Spirit.recallOne("recipe-browser", user.id);

    await spirit.commit(req.body.items);
}