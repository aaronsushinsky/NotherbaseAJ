export default async function viewHistory(req, user) {
    let userToFind = await req.db.User.recallOne(req.body.which);
    let page = await req.db.Spirit.recallOne("it", userToFind.id);

    return page.memory.data;
}