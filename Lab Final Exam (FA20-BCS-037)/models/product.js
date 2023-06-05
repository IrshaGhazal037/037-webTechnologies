var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
    DIASTOLIC: String,
    SYSTOLIC: String,
    time: String
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
