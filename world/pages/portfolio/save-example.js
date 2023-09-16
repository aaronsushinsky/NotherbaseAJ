export default async (req, user) => {
    let spirit = await req.db.Spirit.recallOne("portfolio-examples");

    if (!Array.isArray(spirit.memory.data)) spirit.memory.data = [];

    console.log(req.body.item, req.body.which);
    //new and edit
    if (!req.body.delete && req.body.item) spirit.memory.data[req.body.which] = req.body.item;
    //delete
    else if (req.body.which > -1 && req.body.which < spirit.memory.data.length) {
        spirit.memory.data.splice(req.body.which, 1);
    }

    await spirit.commit();
}