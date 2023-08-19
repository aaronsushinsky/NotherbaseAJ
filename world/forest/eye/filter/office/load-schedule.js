export default async (req, user) => {
    const getInGroups = async (settings = {}) => {
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
                        id: `${groups.memory[i].id}`,
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

    // find groups the user is in
    let inGroups = await getInGroups({
        getMembers: true
    });

    // shared default and make big member list
    let relatedMembers = [];
    for (let i = 0; i < inGroups.length; i++) {
        inGroups[i].shared = false;
        for (let j = 0; j < inGroups[i].members.length; j++) {
            if (inGroups[i].members[j].id != user.id) {
                let found = false;
                for (let k = 0; k < relatedMembers.length; k++) {
                    if (relatedMembers[k].id == inGroups[i].members[j].id) {
                        found = true;
                        break;
                    }
                }
                if (!found) relatedMembers.push(inGroups[i].members[j]);
            }
        }
    }
    
    // update groups in task sharing
    if (!Array.isArray(schedule.memory.data)) schedule.memory.data = [];
    for (let i = 0; i < schedule.memory.data.length; i++) {
        //default
        let old = schedule.memory.data[i].sharing;
        if (!Array.isArray(old)) old = [];
        schedule.memory.data[i].sharing = [];

        // see if keep old 
        let which = -1;
        for (let j = 0; j < inGroups.length; j++) {
            let last = schedule.memory.data[i].sharing.push({
                id: inGroups[j].id,
                name: inGroups[j].name,
                shared: false
            });

            for (let k = 0; k < old.length; k++) {
                if (old[k].id == inGroups[j].id) {
                    schedule.memory.data[i].sharing[last - 1].shared = old[k].shared;
                    old.splice(k, 1);
                    break;
                };
            }
        }
    }
    await schedule.commit();

    // get tasks shared with user
    let sharedTasks = [];
    for (let i = 0; i < relatedMembers.length; i++) {
        let relatedSchedule = await req.db.Spirit.recallOne("schedule", relatedMembers[i].id);

        for (let j = 0; j < relatedSchedule.memory.data.length; j++) {
            let shared = false;
            for (let k = 0; k < relatedSchedule.memory.data[j].sharing.length; k++) {
                for (let l = 0; l < inGroups.length; l++) {
                    if (relatedSchedule.memory.data[j].sharing[k].shared && relatedSchedule.memory.data[j].sharing[k].id == inGroups[l].id) {
                        shared = true;
                        break;
                    }
                }
                if (shared) break;
            }

            if (shared) sharedTasks.push({
                from: relatedMembers[i].name,
                ...relatedSchedule.memory.data[j]
            });
        }
    }

    return {
        userTasks: schedule.memory.data,
        sharedTasks: sharedTasks
    };
}