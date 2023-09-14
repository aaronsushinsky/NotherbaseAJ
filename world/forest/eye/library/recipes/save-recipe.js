export default async (req, user) => {
    let spirit = await req.db.Spirit.recallOne("recipes", user.id);

    if (!Array.isArray(spirit.memory.data)) spirit.memory.data = [];

    spirit.memory.data[req.body.which] = req.body.item;

    await spirit.commit();
}