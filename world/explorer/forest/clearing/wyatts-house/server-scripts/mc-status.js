module.exports = async function (db, currentRoute, user, req) {
    //73.11.150.171
    const pingBedrock = (...args) => import('@minescope/mineping').then(module => module.pingBedrock(...args));

    const data = await pingBedrock('73.11.150.171', {
        port: 19132,
        timeout: 500
    });

    return data;
};