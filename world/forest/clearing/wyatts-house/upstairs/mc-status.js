module.exports = async function (db, currentRoute, user, req) {
    //73.11.150.171
    const pingBedrock = (...args) => import('@minescope/mineping').then(module => module.pingBedrock(...args));

    let data = await pingBedrock('73.11.150.171', {
        port: 19132,
        timeout: 500
    });

    if (!data.players) {
        data = await pingBedrock('10.0.0.83', {
            port: 19132,
            timeout: 500
        });
    }

    if (!data.players) {
        data = await pingBedrock('localhost', {
            port: 19132,
            timeout: 500
        });
    }

    return data;
};