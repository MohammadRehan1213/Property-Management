const User = require('../Models/UserModel')
const asyncHandler = require("express-async-handler");

const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshtoken");

const SignupUser = asyncHandler(async (req, res) => {

    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error("User Already Exists");
    }
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const findSuperAdmin = await User.findOne({ email, role: "admin" });

    const findUser = await User.findOne({ email, role: "user" });

    let user;
    let role;

    if (findSuperAdmin) {
        user = findSuperAdmin;
        role = "admin";
    } else if (findUser) {
        user = findUser;
        role = "user";
    } else {
        return res.status(401).json({ message: "Invalid Credentials" });
    }

    if (user && (await user.isPasswordMatched(password))) {
        const refreshToken = generateRefreshToken(user._id);

        if (role === "admin") {
            updateUser = await User.findByIdAndUpdate(
                user._id,
                {
                    refreshToken
                },
                { new: true }
            );
        } else if (role === "user") {
            updateUser = await User.findByIdAndUpdate(
                user._id,
                {
                    refreshToken
                },
                { new: true }
            );
        }
        let responseData = {};

        if (role === "admin") {
            responseData = {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                mobile: user.mobile,
                password: user.password,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),

            };
        } else if (role === "user") {
            responseData = {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                mobile: user.mobile,
                password: user.password,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),

            };
        }
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });

        res.json(responseData)


    } else {
        return res.status(401).json({ message: "Invalid Credentials" });
    }
});

module.exports = {
    loginAdmin,
    SignupUser
}