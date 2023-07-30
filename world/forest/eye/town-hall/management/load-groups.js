export default async function (req, user) {
    let spirit = await req.db.Spirit.recallAll("group");

    let inGroups = [];

    for (let i = 0; i < spirit.memory.length; i++) {
        if (!spirit.memory[i].data) spirit.memory.splice(i, 1);
        else {
            if (Array.isArray(spirit.memory[i].data.members)) {
                let groupInfo = {
                    id: spirit.memory[i].id,
                    ...spirit.memory[i].data
                }
    
                let userFound = false;

                for (let j = 0; j < spirit.memory[i].data.members.length; j++) {
                    let findUser = await req.db.User.recallOne(null, null, spirit.memory[i].data.members[j].id);

                    groupInfo.members[j] = {
                        id: spirit.memory[i].data.members[j].id,
                        name: findUser.memory.data.username,
                        auth: spirit.memory[i].data.members[j].auth
                    }
                    
                    if (spirit.memory[i].data.members[j].id == `${user.id}`) userFound = true;
                }
                
                if (userFound) {
                    if (!Array.isArray(spirit.memory[i].data.joinRequests)) spirit.memory[i].data.joinRequests = [];

                        for (let j = 0; j < spirit.memory[i].data.joinRequests.length; j++) {
                            let findUser = await req.db.User.recallOne(null, null, spirit.memory[i].data.joinRequests[j].id);
                            
                            groupInfo.joinRequests[j] = {
                                id: spirit.memory[i].data.joinRequests[j].id,
                                name: findUser.memory.data.username,
                                note: spirit.memory[i].data.joinRequests[j].note
                            }
                        }
                    inGroups.push(groupInfo);
                }
            }
            else spirit.memory[i].data.members = [];
        }
    }

    await spirit.commit();

    return inGroups;
}