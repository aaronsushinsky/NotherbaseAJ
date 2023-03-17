export default async (req, user) => {
    let toss = await user.offsetItem("Gold Coin", -(Math.abs(req.body.data.amount)));

    return toss;
}