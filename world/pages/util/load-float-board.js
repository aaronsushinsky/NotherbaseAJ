export default async function (req, user) {
    if (user) {
        let spirit = await req.db.Spirit.recallOne("float-board", user.id);

        if (spirit.memory.data) return spirit.memory.data[req.body.location];
    }
}