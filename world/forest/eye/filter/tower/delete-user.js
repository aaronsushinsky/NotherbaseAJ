export default async (req, user) => {
    if (user.memory.data.authLevels.includes("Creator")) {
        let spirit = await req.db.User.recallOne(null, null, req.body.item.id);

        if (spirit) {
            await spirit.memory.deleteOne();
        }
    }
}