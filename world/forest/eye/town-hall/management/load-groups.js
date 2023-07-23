export default async function (req, user) {
    let spirit = await req.db.Spirit.recallAll("group");

    let inGroups = [];

    for (let i = 0; i < spirit.memory.length; i++) {
        inGroups.push(spirit.memory[i].data);
    }

    return inGroups;
}