export default async (req, user) => {
    await user.offsetItem("Weed", 1);
}