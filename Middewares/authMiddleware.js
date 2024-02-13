const SuperAdmin = require('../Models/SuperAdminModel')
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await SuperAdmin.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized token expired, Please Login again");
    }
  } else {
    throw new Error(" There is no token attached to header");
  }
});
const isSuperAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await SuperAdmin.findOne({ email });
  if (adminUser.role !== "hospital") {
    throw new Error("You are not an add hospital!!!");
  } else {
    next();
  }
});
module.exports = { authMiddleware, isSuperAdmin };

