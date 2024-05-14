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
    },
    offerPrice  : {
        type: String,
        required: true,
    },
    userId:mongoose.Schema.Types.ObjectId,
    country   : {
        type: String,    },
    state  : {
        type: String,    },
    city   : {
        type: String,
    },
},
    {
        timestamps: true,
    },
)
module.exports = mongoose.model("packageoffer", department);