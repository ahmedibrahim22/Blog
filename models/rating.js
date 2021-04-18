const mongoose = require("mongoose")

const ratingSchema = new mongoose.Schema({
    rating: {type: Number, min:0, max: 5, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    onId: {type:mongoose.Schema.Types.ObjectId, refPath: "onModel", required: true},
    onModel: {type: String, required: true, enum: ["User", "Posts"]}
})

const RatingModel = mongoose.model("ٌRating", ratingSchema)

module.exports = RatingModel