export default async (req, user) => {
    let spirit = await req.db.Spirit.recallOne("stories", user.id);

    await spirit.commit(req.body.items);
}