// require the needed modules:

// require bcrypt (to hash the password)
const bcrypt = require("bcrypt");
// require token (to give the user key session)
const jwt = require("jsonwebtoken");
// require schema
const User = require("../model/User");

// signup
// exports signup to keep router clean
exports.signup = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(400).send({
                errors: [{ msg: "email should be unique,please try again" }],
            });
        }
        // bcrypt :to hash the password
        const saltRounds = 10;
        const hashedpassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ ...req.body });
        newUser.password = hashedpassword;
        await newUser.save();
        // creation token
        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );
        res.status(200).send({
            msg: "signup successfully",
            user: newUser,
            token,
        });
    } catch (error) {
        res.status(400).send({ msg: "cannot register this user" });
    }
};
// sign in
// exports signin to keep router clean

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            res.status(400).send({ errors: [{ msg: "bad credential" }] });
        }
        const checkPassword = await bcrypt.compare(
            password,
            foundUser.password
        );
        if (!checkPassword) {
            res.status(400).send({ errors: [{ msg: "bad credential" }] });
        }

        // creation token
        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(200).send({
            msg: "login successfully,welcome",
            user: foundUser,
            token,
        });
    } catch (error) {
        res.status(400).send({ msg: "cannot login " });
    }
};
