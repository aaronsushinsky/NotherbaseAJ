export default async function (req, user) {
    let spirit = await req.db.Spirit.recallOne(`${req.body.id}-projector`);

    await spirit.commit({
        url: req.body.url
    });
}