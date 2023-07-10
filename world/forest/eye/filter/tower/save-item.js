export default async (req, user) => {
    if (user.memory.data.authLevels.includes("Creator")) {
        let item = await req.db.Item.recallOne(req.body.item.name);
        if (item) {
            await item.commit(req.body.item);
        }
        else await req.db.Item.create(req.body.item.name, req.body.item.short, req.body.item.long);
    }
}