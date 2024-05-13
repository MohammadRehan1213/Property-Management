const User = require('../Models/UserModel')
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');

const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshtoken");

const SignupUser = asyncHandler(async (req, res) => {
    const img =   req.uploadedImages
    const newUser = await User.create({
        images: img,
        ...req.body
    });
    res.json(newUser);
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
            updateuser = await User.findByIdAndUpdate(
                user._id,
                {
                    refreshToken
                },
                { new: true }
            );
        } else if (role === "user") {
            updateuser = await User.findByIdAndUpdate(
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

const getsingleuser = async (req, resp) => {
    try {
        const result = await User.find({ _id: req.params.id })
        resp.send(result)
    } catch (error) {
        resp.status(404).json(error.message)

    }
}



const updateUser = async (req, res) => {
    try {
        const { password, ...updateData } = req.body;
        const img = req.uploadedImageUrl

        // Check if password is provided and it's a non-empty string
        if (password && typeof password === 'string' && password.trim().length > 0) {
            const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password
            updateData.password = hashedPassword; // Update the password field in updateData
        }

        let result = await User.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    image: img,
                    ...updateData
                }
            },
            { new: true }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error.message);
    }
};



module.exports = {
    loginAdmin,
    SignupUser,
    getsingleuser,
    updateUser
}
