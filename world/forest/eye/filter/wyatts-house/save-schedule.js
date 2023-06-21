export default async (req, user) => {
    let spirit = await req.db.Spirit.recallOne(`${req.body.id}-browser`, user.id);

    await spirit.commit({ items: req.body.items });
}