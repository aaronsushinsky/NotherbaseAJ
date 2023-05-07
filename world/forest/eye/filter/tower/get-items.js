export default async (req, user) => {
    if (user.memory.data.authLevels.includes("Creator")) {
        let items = await req.db.Item.recallAll();

        let itemData = [];

        for (let i = 0; i < items.memory.length; i++) {
            if (items.memory[i].data) itemData.push(items.memory[i].data);
        }
    
        return itemData;
    }
    else return null;
}