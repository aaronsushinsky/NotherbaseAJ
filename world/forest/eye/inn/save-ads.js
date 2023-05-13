export default async (req, user) => {
    if (user.memory.data.authLevels.includes("eotf-inn-ads")) {
        let spirit = await req.db.Spirit.recallOne("eotf-inn-ads");

        await spirit.commit({ items: req.body.items });
    }
}