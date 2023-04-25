export default async (req, user) => {
    if (user.memory.data.authLevels.includes("Creator")) {
        let item = await req.db.Item.recallOne(req.body.data.oldName);
        
        item.memory.data.name = req.body.data.name;
        item.memory.data.short = req.body.data.short;
        item.memory.data.long = req.body.data.long;
        await item.commit();
    }
}