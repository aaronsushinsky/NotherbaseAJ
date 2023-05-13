export default async (req, user) => {
    let spirit = await req.db.Spirit.recallOne("stories", user.id);

    await spirit.commit({ items: req.body.items });
}