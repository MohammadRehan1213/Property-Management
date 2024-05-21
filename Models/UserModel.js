const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const validator = require('validator')

var userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
        },
        lastname: {
            type: String,
        },
        email: {
            type: String,
        },
        mobile: {
            type: String,
        },
        password: {
            type: String,
        },
        images: {
            type: []
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        role: {
            type: String,
            default: "user"
        },
        mobileNumber: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resettoken)
        .digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
    return resettoken;
};

//Export the model
module.exports = mongoose.model("User", userSchema);

// {
//     "firstname": "rohit",
//         "lastname": "sharma",
//             "email": "rohit@gmail.com",
//                 "mobile": "2132548471",
//                     "password": "rohit"
// }
