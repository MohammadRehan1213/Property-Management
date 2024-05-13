const express = require("express");
const multer = require("multer"); // For handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
    loginAdmin,
    SignupUser,
    getsingleuser,
    updateUser
} = require("../Controllers/UserCtrl");
const  uploadCloudinary = require('../Middewares/multipleImgUplaod')
const uploadSingleImageToCloudinary =require("../Middewares/singleImgUpload")
const router = express.Router();

router.post("/login", loginAdmin);
router.get("/user/:id", getsingleuser);
router.put("/register/:id", upload.single('image'), uploadSingleImageToCloudinary, updateUser);
router.post("/register",upload.single('image'), uploadSingleImageToCloudinary, SignupUser);

module.exports = router;
