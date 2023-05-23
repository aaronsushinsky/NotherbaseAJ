export default async (req, user) => {
    let spirit = await req.db.Spirit.recallOne(`bb-${req.body.id}`, user.id);

    await spirit.commit({ items: req.body.items });
}