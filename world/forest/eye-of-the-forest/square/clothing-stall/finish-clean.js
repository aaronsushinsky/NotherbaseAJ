export default async (req, user) => {
    user.offsetItem("Debris", 2);

    let spirit = await req.db.Spirit.recallOrCreate({
        route: "/forest/eye-of-the-forest/square/clothing-stall",
        scope: "local",
        parent: user.id,
        service: "debris"
    }, null, {
        lastClean: Date.now()
    });

    spirit.memory.data.lastClean = Date.now();
    await spirit.commit();
}