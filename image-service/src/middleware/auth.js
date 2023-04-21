const jwt = require("jsonwebtoken");
const fs = require("fs");

const keyPath = process.env.JWT_PUBLIC_KEY;
const issuer = process.env.JWT_ISSUER;

const auth = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader && authorizationHeader.split(" ")[1];
    if (!token) {
        return res.status(401).send({ message: "Invalid token" });
    }

    const key = await fs.readFile(keyPath);
    const decoded = await jwt.verify(token, key, {
        algorithms: ["RS256"],
        issuer,
    });
    if (decoded.exp * 1000 <= Date.now()) {
        return res.status(401).send({ message: "Token expired" });
    }

    req.user = decoded.sub;
    next();
}

module.exports = auth;
