export default async (req, user) => {
    if (user.memory.data.authLevels.includes("Creator")) {
        let item = await req.db.Item.create(req.body.name, req.body.shortDescription, req.body.fullDescription);
    }
}