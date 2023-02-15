export default async (req, user) => {
    await req.db.Spirit.delete({
        service: "ant-hill-game"
    });
    
    await user.offsetItem("Queen Ant Egg", 1);
}