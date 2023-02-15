export default async (req, user) => {
    let result = await user.offsetItem("Queen Ant Egg", -1);

    return result;
}