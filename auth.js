const auth = (req, res, next) => {
    console.log("Authenticating...");
    if (!req.body.token) return res.status(401).send("You are not authorized to create genere")
    next();
}

module.exports = auth;