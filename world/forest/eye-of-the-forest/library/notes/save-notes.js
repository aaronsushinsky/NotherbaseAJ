export default async (req, user) => {
    let spirit = await req.db.Spirit.recallOrCreate({
        route: "/forest/eye-of-the-forest/library/notes",
        scope: "local",
        parent: user.id,
        service: "notes"
    }, null, {
        items: []
    });

    spirit.memory.data.items = req.body.data.items;
    await spirit.commit();
}