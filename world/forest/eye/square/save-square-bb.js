export default async (req, user) => {   
    if (req.body.items.length < 6) {
        let spirit = await req.db.Spirit.recallOne("square-bb");

        await spirit.commit({ items: req.body.items });
    }
} //error here