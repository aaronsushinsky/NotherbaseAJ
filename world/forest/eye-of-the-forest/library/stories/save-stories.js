export default async (req, user) => {
    let spirit = await req.db.Spirit.recallOrCreate({
        route: "/forest/eye-of-the-forest/library/stories",
        scope: "local",
        parent: user.id,
        service: "stories"
    }, null, {
        items: []
    });

    console.log(spirit);

    spirit.memory.data.items = req.body.data.items;
    await spirit.commit();
}