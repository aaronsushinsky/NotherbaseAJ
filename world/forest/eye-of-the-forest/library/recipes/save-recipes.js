export default async (req, user) => {
    let spirit = await req.db.Spirit.recallOrCreate({
        route: "/forest/eye-of-the-forest/library/recipes",
        scope: "local",
        parent: user.id,
        service: "recipes"
    }, null, {
        recipes: []
    });

    spirit.memory.data.recipes = req.body.data.recipes;
    await spirit.commit();

    if (spirit.memory.data.items) spirit.memory.data.items = null;
}