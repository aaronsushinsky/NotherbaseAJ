export default async (req, user) => {
    user.offsetItem("Gold Coin", 1);

    let spirit = await req.db.Spirit.recallOne("service", user.id);

    await spirit.commit({ name: "changed" });
}