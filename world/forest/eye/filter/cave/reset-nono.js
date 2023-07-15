export default async (req, user) => {
    let nono = await req.db.Spirit.recallOne("filter-cave-nono", user.id);

    await nono.commit({
        level: 0,
        difficulty: 0
    });
}