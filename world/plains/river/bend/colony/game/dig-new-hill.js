export default async (req, user) => {
    let traded = await user.offsetItem("Queen Ant Egg", -1);

    if (traded) {
        let spirit = await req.db.Spirit.recallOrCreate({
            service: "ant-hill-game"
        }, {
            colonies: []
        });

        spirit.memory.data.colonies.push({
            hills: [{
                chambers: [{
                    size: 50,
                    capacity: 5,
                    resources: [
                        {
                            type: "food",
                            amount: 500
                        },
                        {
                            type: "water",
                            amount: 1000
                        }
                    ]
                }]
            }]
        });

        await spirit.commit();
    }

    return traded;
}