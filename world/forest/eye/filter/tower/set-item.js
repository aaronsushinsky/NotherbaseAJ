export default async (req, user) => {
    if (user.memory.data.authLevels.includes("Creator")) {
        let item = await req.db.Item.recallOne(req.body.oldName);
        
        item.memory.data.name = req.body.name;
        item.memory.data.short = req.body.short;
        item.memory.data.long = req.body.long;
        await item.commit();
    }
}