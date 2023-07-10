export default async (req, user) => {
    if (user.memory.data.authLevels.includes("Creator")) {
        let spirit = await req.db.User.recallOne(req.body.item.email);

        if (!spirit) {
            spirit = await req.db.User.create(req.body.item.username, req.body.item.password ? req.body.item.password : "password", req.body.item.email);
        }
        let keys = Object.keys(req.body.item);
            for (let k = 0; k < keys.length; k++) {
                spirit.memory.data[keys[k]] = req.body.item[keys[k]];
            }
            await spirit.commit();
    }
}