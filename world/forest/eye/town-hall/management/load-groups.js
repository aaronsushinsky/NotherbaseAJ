export default async function (req, user) {
    let spirit = await req.db.Spirit.recallAll("group");

    let inGroups = [];

    for (let i = 0; i < spirit.memory.length; i++) {
        if (spirit.memory[i].data.members.includes(`${user.id}`)) {
            let groupInfo = {
                id: spirit.memory[i].id,
                ...spirit.memory[i].data
            }

            for (let j = 0; j < spirit.memory[i].data.members.length; j++) {
                let user = await req.db.User.recallOne(null, null, spirit.memory[i].data.members[j]);
                groupInfo.members[j] = {
                    id: spirit.memory[i].data.members[j],
                    name: user.memory.data.username
                }
            }

            inGroups.push(groupInfo);
        }
    }

    return inGroups;
}