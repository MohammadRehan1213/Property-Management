const mongoose = require("mongoose");

const department = mongoose.Schema({

    offerTitle   : {
        type: String,
        required: true,
    },
    offerName  : {
        type: String,
        required: true,
    },
    offertestPackage   : {
        type: [],
        required: true,
    },
    offerPrice  : {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
    },
)
module.exports = mongoose.model("packageoffer", department);