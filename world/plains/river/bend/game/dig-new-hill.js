export default async (req, user) => {
    let traded = await user.offsetItem("Queen Ant Egg", -1);

    if (traded) {
        let spirit = await req.db.Spirit.recallOrCreate({
            service: "ant-hill-game"
        });

        if (typeof spirit.memory.data.colonies != "array") spirit.memory.data.colonies = [];

        spirit.memory.data.colonies.push({
            hills: [{
                chambers: [{
                    size: 20
                }]
            }]
        });

        await spirit.commit();
    }

    return traded;
}