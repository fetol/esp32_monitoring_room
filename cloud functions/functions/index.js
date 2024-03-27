const functions = require("firebase-functions");
const firebase = require('firebase-admin');
const key = require("./key.json");
const cors = require("cors")({ origin: ["https://bafybeihqjhczgcn7n7bvq7kb24xu54dkvqlygvpvku3euhlxnunjse5h4u.ipfs.infura-ipfs.io", "ipfs://bafybeihqjhczgcn7n7bvq7kb24xu54dkvqlygvpvku3euhlxnunjse5h4u"] });

firebase.initializeApp({
    credential: firebase.credential.cert(key),
    databaseURL: "https://vue-http-908f5-default-rtdb.europe-west1.firebasedatabase.app"
});

const auth = firebase.auth();

const createUser = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            const email = req.body.email;
            const number = req.body.phoneNumber;
            const username = req.body.displayName;
            const password = req.body.password;

            await auth.createUser({
                email: email,
                phoneNumber: number,
                password: password,
                displayName: username
            })
            res.status(200).send()
        } catch (err) {
            res.send(err);
        }
    })
})

const getUsers = functions.https.onRequest(async (req, res) => {
    const users = await listAllUsers();
    cors(req, res, () => {
        res.send(JSON.stringify(users));
    })
})

const delUser = functions.https.onRequest((req, res) => {
    const uid = req.body.uid;
    cors(req, res, () => {
        auth.deleteUser(uid).then(() => {
            res.status(200).send("Deleted user!")
        }).catch((err) => {
            res.status(500).send("Failed bro", err)
        })
    })
})

//ide len ak použivatel zada aj email aj meno aj číslo
const upUser = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            const uid = req.body.uid;
            const email = req.body.email;
            const number = req.body.phoneNumber;
            const username = req.body.displayName;
            await auth.updateUser(uid, {
                email: email,
                phoneNumber: number,
                displayName: username,
            })
            res.status(200).send()
        } catch (err) {
            res.send(err);
        }
    })
})

const listAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        // List batch of users, 1000 at a time.
        try {
            const listUsersResult = await auth.listUsers(1000);
            let users = [];
            listUsersResult.users.forEach((userRecord) => {
                users = [
                    ...users,
                    userRecord
                ];
            });
            resolve(users);
        } catch (error) {
            console.log('Error listing users:', error);
            reject(error);
        };
    })
};


module.exports = {
    getUsers,
    delUser,
    upUser,
    createUser
};