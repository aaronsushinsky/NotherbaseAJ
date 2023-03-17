export default async (req, user) => {
    let spirit = await req.db.Spirit.recallOrCreate({
        route: "/forest/eye-of-the-forest/library/recipes",
        scope: "local",
        parent: user.id,
        service: "recipes"
    }, null, {
        items: []
    });

    spirit.memory.data.items = req.body.data.items;
    await spirit.commit();

    if (spirit.memory.data.recipes) spirit.memory.data.recipes = null;
}