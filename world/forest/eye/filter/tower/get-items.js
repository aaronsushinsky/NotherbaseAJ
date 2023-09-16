export default async (req, user) => {
    if (user.memory.data.authLevels.includes("Creator")) {
        let spirit = await req.db.Spirit.recallAll("items");
    
        let itemData = [];
    
        for (let i = 0; i < spirit.memory.length; i++) {
            spirit.memory[i].data.id = spirit.memory[i]._id;
            itemData.push(spirit.memory[i].data);
        }
    
        return itemData;
    }
    else return null;
}