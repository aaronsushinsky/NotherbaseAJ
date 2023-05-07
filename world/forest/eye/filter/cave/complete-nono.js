export default async (req, user) => {
    user.offsetItem("Gold Coin", req.body.data.level + req.body.data.difficulty);

    let nono = await req.db.Spirit.recallOne("filter-cave-nono", user.id);

    await nono.commit({
        level: req.body.data.level,
        difficulty: req.body.data.difficulty
    });
}