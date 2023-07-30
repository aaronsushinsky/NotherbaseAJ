export default async function (req, user) {
    let spirit = await req.db.Spirit.recallOne("group", null, { name: req.body.name });

    if (!spirit.memory.data.members || spirit.memory.data.members.length < 0) {
        await spirit.commit({ 
            name: req.body.name,
            description: req.body.description,
            members: [{
                id: `${user.id}`,
                auth: [ "Leader" ]
            }],
            joinRequests: [
                /*{
                    id: String,
                    note: String
                }*/
            ],
            settings: {
                memberLimit: -1
            }
        });

        return true;
    }
    else return false;
}