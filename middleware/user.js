// require JasonWebToken
const jwt = require("jsonwebtoken");

// require schema
const User = require("../model/User");

// is the use authorized or not
const isAuth = async (req, res, next) => {
    try {
        const token = req.Headers["Authorization"];
        if (!token) {
            res.status(401).send({ errors: [{ msg: "token not authorzied" }] });
        }
        // decoded : to verify if the token given to the right person
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const foundUser = await User.findOne({ _id: decoded.id });

        if (!foundUser) {
            res.status(401).send({ errors: [{ msg: "user not authorzied" }] });
        }
        req.user = foundUser;

        next();
    } catch (error) {
        res.status(401).send({ errors: [{ msg: "not authorzied" }] });
    }
};
module.exports = isAuth;
