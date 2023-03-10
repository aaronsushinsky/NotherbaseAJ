export default async (req, user) => {   
    if (req.body.data.items.length < 6) {
        let spirit = await req.db.Spirit.recallOrCreate({
            route: "/forest/eye-of-the-forest/square",
            scope: "global",
            parent: null,
            service: "square-bb"
        }, null, {
            items: null
        });

        spirit.memory.data.items = req.body.data.items;
        await spirit.commit();
    }
}