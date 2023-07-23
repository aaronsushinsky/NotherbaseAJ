export default async function (req, user) {
    let spirit = await req.db.Spirit.create("group", { 
        name: req.body.name,
        description: req.body.description,
        members: [ `${user.id}` ],
        memberSettings: [{
            user: `${user.id}`,
            auth: [ "Leader" ]
        }],
        settings: {
            memberLimit: -1,
            roles:[]
        }
    });
}