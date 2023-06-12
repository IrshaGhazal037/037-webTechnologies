const mongoose = require("mongoose");
let modelSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    rollnumber: { type: String, unique: true },

});
let Model = mongoose.model("Students", modelSchema);
module.exports = Model;