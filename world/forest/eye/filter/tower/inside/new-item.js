export default async (req, user) => {
    if (user.memory.data.authLevels.includes("Creator")) {
        let item = await req.db.Item.create(req.body.data.name, req.body.data.shortDescription, req.body.data.fullDescription);
    }
}