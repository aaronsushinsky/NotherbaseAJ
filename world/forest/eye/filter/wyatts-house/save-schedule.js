export default async (req, user) => {
    let spirit = await req.db.Spirit.recallOne(`schedule`, user.id);

    await spirit.commit(req.body.items);
}