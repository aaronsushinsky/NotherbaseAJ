// options = {
//     name: "it",
//     scope: "local",
//     mode: "add" "overwrite" "rewrite",
// }

const createNew = async function createNew(db, options, user, data) {
    return await db.page.create({
        name: options.name,
        type: options.scope,
        user: user,
        data: data
    });
}

const post = async function post(db, user, body, options) {
    try {
        let foundPage = null;

        if (options.scope === "local") {
            foundPage = await db.page.findOne({ name: options.name, user: user });
        }
        else {
            foundPage = await db.page.findOne({ name: options.name, type: options.scope });  
            user = ""; 
        }

        if (foundPage === null) {
            createNew(db, options, user, body);
        }
        else {
            if (options.mode === "rewrite") {
                foundPage.data = body;
            }
            else if (options.mode === "overwrite") {
                let keys = Object.keys(body);

                for (let i = 0; i < keys.length; i++) {
                    foundPage.data[keys[i]] = body[keys[i]];
                }
            }
            else if (options.mode === "add") {
                let keys = Object.keys(body);

                for (let i = 0; i < keys.length; i++) {
                    if (foundPage.data[keys[i]]) {
                        if (Array.isArray(foundPage.data[keys[i]])) {
                            for (let j = 0; j < body[keys[i]].length; j++) {
                                foundPage.data[keys[i]].push(body[keys[i]][j]);
                            }
                        }
                        else {
                            foundPage.data[keys[i]] += body[keys[i]];
                        }
                    }
                    else {
                        foundPage.data[keys[i]] = body[keys[i]];
                    }
                }
            }

            foundPage.markModified("data");
            await foundPage.save();
        }

        return "posted";
    }
    catch(err) {
        return err;
    }
}

const get = async function get(db, user, query, options) {
    try {
        let foundPage = null;

        if (options.scope === "local") {
            foundPage = await db.page.findOne({ name: options.name, user: user });
        }
        else {
            foundPage = await db.page.findOne({ name: options.name, type: options.scope });   
            user = "";
        }

        if (foundPage === null) {
            return await createNew(db, options, user, body);
        }

        else return foundPage;
    }
    catch(err) {
        return err;
    }
}

module.exports = {
    post: post,
    get: get
}