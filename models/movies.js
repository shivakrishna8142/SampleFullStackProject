const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id:String,
    year: Number,
    title: String
});
const movies = mongoose.model("movies", productSchema);
module.exports = movies;