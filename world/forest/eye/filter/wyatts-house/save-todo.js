export default async (req, user) => {
    let spirit = await req.db.Spirit.recallOrCreate({
        scope: "local",
        parent: user.id,
        service: `todo-${req.body.data.id}`
    }, null, {
        items: null
    });

    spirit.memory.data.items = req.body.data.items;
    await spirit.commit();
}