const express = require("express");
const { getpaginate, Getdata, Postdata, Putdata, DeleteData, getdata,getallpackgebyuserid } =
    require('../Controllers/PackgeOfferCtrl')
const router = express.Router();
const {UserMiddleware} = require('../Middewares/userMiddlewares')
router.get("/",UserMiddleware, getdata)
router.get("/:id", Getdata)
router.get("/getpackageuser/:userId", getallpackgebyuserid)

router.post("/",UserMiddleware, Postdata)
router.put("/:id", Putdata)
router.delete("/:id",UserMiddleware, DeleteData)

module.exports = router;
