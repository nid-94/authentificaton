// require express
const express = require("express");
const { signup, signin } = require("../controllers/user");
const isAuth = require("../middleware/user");

// create instance
const router = express.Router();

// Authenfication (signup && signin)
// ==>signup
router.post("/signup", signup);
router.post("/signin", signin);
// current user
router.get("/current", isAuth, (req, res) => {
    res.send(req.user);
});

module.exports = router;
