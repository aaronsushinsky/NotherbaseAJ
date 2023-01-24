export default async (req, user) => {
    let spirit = await req.db.Spirit.recallOrCreate({
        route: "/forest/clearing/wyatts-house/upstairs",
        scope: "local",
        parent: user.id,
        service: "todo"
    }, null, {
        tasks: null
    });

    spirit.memory.data.tasks = req.body.data.tasks;
    await spirit.commit();
}