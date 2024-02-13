const express = require("express");
const {
    loginAdmin,
    loginUser,
    SignupUser
} = require("../Controllers/UserCtrl");

const router = express.Router();

router.post("/admin-login", loginAdmin);
router.post("/login", loginUser);
router.post("/register", SignupUser);

module.exports = router;