const express = require("express");
const multer = require("multer"); // For handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
    loginAdmin,
    SignupUser,
    getsingleuser,
    updateUser,
    getuseridbyPackges
} = require("../Controllers/UserCtrl");
const uploadCloudinary = require('../Middewares/multipleImgUplaod')
const uploadSingleImageToCloudinary = require("../Middewares/singleImgUpload")
const router = express.Router();

router.post("/login", loginAdmin);
router.get("/user/:id", getsingleuser);
router.put("/register/:id", upload.single('images'), uploadSingleImageToCloudinary, updateUser);
router.post("/register", upload.array('images'), uploadCloudinary, SignupUser);
router.get("/getpackagesbyuser/:userId", getuseridbyPackges);

module.exports = router;
