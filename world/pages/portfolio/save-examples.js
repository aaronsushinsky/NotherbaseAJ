export default async (req, user) => {
    let spirit = await req.db.Spirit.recallOne("portfolio-examples");

    await spirit.commit(req.body.items);
}