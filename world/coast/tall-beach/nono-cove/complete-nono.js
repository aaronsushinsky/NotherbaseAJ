export default async (req, user) => {
    user.offsetItem("Gold Coin", req.body.data.level + req.body.data.difficulty);

    let nono = await req.db.Spirit.recallOrCreate({
        route: "/coast/tall-beach/nono-cove",
        scope: "local",
        parent: user.id,
        service: "nono"
    }, null, {
        level: req.body.data.level,
        difficulty: req.body.data.difficulty
    });

    nono.memory.data.level = req.body.data.level;
    nono.memory.data.difficulty = req.body.data.difficulty;
    await nono.commit();
}