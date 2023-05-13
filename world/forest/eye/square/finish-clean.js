export default async (req, user) => {
    user.offsetItem("Debris", 2);

    let spirit = await req.db.Spirit.recallOne("debris", user.id);
    await spirit.commit({
        lastClean: Date.now()
    });
}