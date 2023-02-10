export default async (req, user) => {
    if (user.memory.data.authLevels.includes("eotf-inn-ads")) {
        let spirit = await req.db.Spirit.recallOrCreate({
            route: "/forest/eye-of-the-forest/inn",
            scope: "global",
            parent: null,
            service: "ads"
        }, null, {
            items: null
        });

        spirit.memory.data.items = req.body.data.items;
        await spirit.commit();
    }
}