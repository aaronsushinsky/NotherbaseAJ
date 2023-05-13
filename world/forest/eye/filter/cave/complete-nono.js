export default async (req, user) => {
    user.offsetItem("Gold Coin", req.body.level + req.body.difficulty);

    let nono = await req.db.Spirit.recallOne("filter-cave-nono", user.id);

    await nono.commit({
        level: req.body.level,
        difficulty: req.body.difficulty
    });
}