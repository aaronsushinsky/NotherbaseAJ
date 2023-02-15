export default async (req, user) => {
    await user.offsetItem("Queen Ant Egg", 1);
}