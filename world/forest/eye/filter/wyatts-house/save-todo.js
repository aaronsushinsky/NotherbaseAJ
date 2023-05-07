export default async (req, user) => {
    let spirit = await req.db.Spirit.recallOne(`todo-${req.body.data.id}`, user.id);

    await spirit.commit({ items: req.body.data.items });
}