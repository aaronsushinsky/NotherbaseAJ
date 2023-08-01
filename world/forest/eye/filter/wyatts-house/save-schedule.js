export default async (req, user) => {
    let spirit = await req.db.Spirit.recallOne(`schedule`, user.id);

    for (let i = 0; i < req.body.items.length; i++) {
        console.log(req.body.items[i].sharing);
    }
    //await spirit.commit(req.body.items);
}