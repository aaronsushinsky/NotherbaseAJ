export default async (req, user) => {
    user.offsetItem("Gold Coin", 1);

    let spirit = await req.db.Spirit.recallOrCreate({
        route: "/route",
        scope: "local",
        parent: user.id,
        service: "service"
    }, {
        name: "data to query"
    }, {
        name: "default data"
    });

    spirit.memory.data.name = "changed";
    await spirit.commit();
}