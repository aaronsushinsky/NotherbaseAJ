export default async (req, user) => {
    let spirit = await req.db.Spirit.recallOne("notes", user.id);

    await spirit.commit({ items: req.body.data.items });
}