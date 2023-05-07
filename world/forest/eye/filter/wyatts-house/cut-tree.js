export default async (req, user) => {
    await user.offsetItem("Tree Trunk", 1);
}