export default async (req, user) => {
    let spirit = await req.db.Spirit.recallOne("bible-research-persons", user.id);

    if (!Array.isArray(spirit.memory.data)) spirit.memory.data = [];

    //new and edit
    console.log(req.body);
    if (req.body.item) spirit.memory.data[req.body.which] = req.body.item;
    //delete
    else if (req.body.which > -1 && req.body.which < spirit.memory.data.length) {
        spirit.memory.data.splice(req.body.which, 1);
    }

    await spirit.commit();
}