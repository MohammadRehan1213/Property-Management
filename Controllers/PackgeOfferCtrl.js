const db = require('../Models/PackgeOfferModel');


const getdata = async (req, res) => {
    const data = await db.find()
    res.json(data)
}
const Getdata = async (req, resp) => {
    try {
        const result = await db.find({ _id: req.params.id })
        resp.send(result)
    } catch (error) {
        resp.status(404).json(error.message)

    }
}
const Postdata = async (req, res) => {

    const newUser = await db.create(req.body);

    res.json(newUser);
};

const Putdata = async (req, res) => {
    try {
        let result = await db.updateOne(
            { _id: req.params.id },
            {
                $set: req.body
            })
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error.message)
    }
}
const DeleteData = async (req, res) => {
    try {
        let result = await db.deleteOne({ _id: req.params.id },
            {
                $set: req.body
            })
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error.message)
    }
}

module.exports = {getdata, Getdata, Postdata, Putdata, DeleteData };   