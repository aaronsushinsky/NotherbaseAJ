export default async (req, user) => {
    let spirit = await req.db.Spirit.recallOne("recipes", user.id);

    await spirit.commit({ recipes: req.body.data.recipes });
}