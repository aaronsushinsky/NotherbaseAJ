export default async (req, user) => {
    if (user.memory.data.authLevels.includes("Creator")) {
        if (req.body.delete) {
            if (req.body.item.id) {
                await req.db.Spirit.delete("user", null, null, req.body.item.id);
            }
        }
        else {
            let spirit = null;

            if (req.body.item.id) {
                spirit = await req.db.Spirit.recallOne("user", null, null, req.body.item.id);

                if (spirit) {
                    let keys = Object.keys(req.body.item);
                    for (let k = 0; k < keys.length; k++) {
                        spirit.memory.data[keys[k]] = req.body.item[keys[k]];
                    }
    
                    await spirit.commit();
                }
            }
            
            if (!spirit) spirit = await req.db.User.create(req.body.item.username, req.body.item.password ? req.body.item.password : "password", req.body.item.email);
        }
    }
}