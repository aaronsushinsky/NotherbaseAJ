export default async (req, user) => {
    let spirit = await req.db.Spirit.recallOne("eotf-inn-stage");
    spirit.memory.data.applications.push(req.body.data);
    await spirit.commit();
}