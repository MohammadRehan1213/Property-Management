const express = require("express");
const {
    loginAdmin,
    SignupUser
} = require("../Controllers/UserCtrl");

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/register", SignupUser);

module.exports = router;