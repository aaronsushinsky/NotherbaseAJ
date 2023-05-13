export default async (req, user) => {   
    if (req.body.data.items.length < 6) {
        let spirit = await req.db.Spirit.recallOne("square-bb");

        await spirit.commit({ items: req.body.items });
    }
}