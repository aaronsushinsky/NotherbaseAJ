export default async (req, user) => {
    //check if logged in
    if (user.id) {
        //get the document in the database
        let spirit = await req.db.Spirit.recallOne("bible-research-persons", user.id);

        //normalize the document's data
        if (!Array.isArray(spirit.memory.data)) spirit.memory.data = [];
    
        //delete if requested
        if (req.body.deleting) {
            //check that deletion is valid
            if (req.body.which > -1 && req.body.which < spirit.memory.data.length) {
                //delete
                spirit.memory.data.splice(req.body.which, 1);
            }
        }
        else {
            //check that a valid item was sent
            if (req.body.item) {
                //edit or add a new item
                spirit.memory.data[req.body.which] = req.body.item;
            }
        }

        //save the document in the database
        await spirit.commit();
    }
}