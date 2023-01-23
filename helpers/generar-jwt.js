const jwt = require("jsonwebtoken");

const generateJWT = (id = "", username = "", expira = "24h") => {
    return new Promise((resolve, reject) => {
        const payload = {
            id,
            username
        }

        jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: expira
        }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = generateJWT;