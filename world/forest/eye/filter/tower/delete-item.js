export default async (req, user) => {
    if (user.memory.data.authLevels.includes("Creator")) {
        let spirit = await req.db.Item.recallOne(req.body.item.name);

        if (spirit) {
            await spirit.memory.deleteOne();
        }
    }
}