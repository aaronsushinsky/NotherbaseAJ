export default async (req, user) => {
    const getInGroups = async (settings) => {
        settings = {
            getName: true,
            getMembers: false,
            getJoinRequests: false,
            getSettings: false,
            ...settings
        }

        let groups = await req.db.Spirit.recallAll("group");
        let inGroups = [];
        
        for (let i = 0; i < groups.memory.length; i++) {
            if (!groups.memory[i].data) groups.memory.splice(i, 1);
            else {
                if (Array.isArray(groups.memory[i].data.members)) {
                    let groupInfo = {
                        id: groups.memory[i].id,
                        name: groups.memory[i].data.name,
                        description: groups.memory[i].data.description,
                        members: [],
                        joinRequests: []
                    }
                    if (settings.getSettings) groupInfo.settings = groups.memory[i].data.settings;
        
                    let userFound = false;
    
                    for (let j = 0; j < groups.memory[i].data.members.length; j++) {
                        if (settings.getMembers) {
                            let findUser = await req.db.User.recallOne(null, null, groups.memory[i].data.members[j].id);
        
                            groupInfo.members[j] = {
                                id: groups.memory[i].data.members[j].id,
                                name: findUser.memory.data.username,
                                auth: groups.memory[i].data.members[j].auth
                            }
                        }
                        
                        if (groups.memory[i].data.members[j].id == `${user.id}`) userFound = true;
                    }
                    
                    if (userFound) {
                        if (settings.getJoinRequests) {
                            if (!Array.isArray(groups.memory[i].data.joinRequests)) groups.memory[i].data.joinRequests = [];
        
                            for (let j = 0; j < groups.memory[i].data.joinRequests.length; j++) {
                                let findUser = await req.db.User.recallOne(null, null, groups.memory[i].data.joinRequests[j].id);
                                
                                groupInfo.joinRequests[j] = {
                                    id: groups.memory[i].data.joinRequests[j].id,
                                    name: findUser.memory.data.username,
                                    note: groups.memory[i].data.joinRequests[j].note
                                }
                            }
                        }

                        inGroups.push(groupInfo);
                    }
                }
                else groups.memory[i].data.members = [];
            }
        }

        await groups.commit();

        return inGroups;
    }

    let schedule = await req.db.Spirit.recallOne("schedule", user.id);

    //find groups the user is in
    let inGroups = await getInGroups();

    for (let i = 0; i < inGroups.length; i++) {
        inGroups[i].shared = false;
    }
    
    // update groups in task sharing
    for (let i = 0; i < schedule.memory.data.length; i++) {
        //default
        let old = schedule.memory.data[i].sharing;
        if (!Array.isArray(old)) old = [];
        schedule.memory.data[i].sharing = inGroups;

        // see if keep old group
        let which = -1;
        for (let j = 0; j < schedule.memory.data[i].sharing.length; j++) {
            for (let k = 0; k < old.length; k++) {
                if (old[k].id == schedule.memory.data[i].sharing[j].id) {
                    schedule.memory.data[i].sharing[j].shared = old[k].shared;
                    old.splice(k, 1);
                    break;
                };
            }
        }
    }

    await schedule.commit();
    console.log(schedule.memory.data);

    return schedule.memory.data;
}