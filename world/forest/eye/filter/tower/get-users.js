export default async (req, user) => {
    if (user.memory.data.authLevels.includes("Creator")) {
        let spirit = await req.db.Spirit.recallAll("user");
    
        let userData = [];
    
        for (let i = 0; i < spirit.memory.length; i++) {
            spirit.memory[i].data.id = spirit.memory[i]._id;
            userData.push(spirit.memory[i].data);
        }
    
        return userData;
    }
    else return null;
}