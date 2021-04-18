const mongoose = require("mongoose")
const RatingModel = require("../models/rating")

const postsSchema = new mongoose.Schema({
    title: { type: "string", required: true, maxLength: 20 },
    body: {type: String, maxLength: 100},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

postsSchema.methods.getAvgRating = async function () {
    try {
        const rating = await RatingModel.find({ onId: this._id });
        let avgRating = 0;
        let count = 0;
        for (const rateingObj of rating) {
            avgRating += rateingObj.rateing;
            count += 1;
        }
        return avgRating / count;
    } catch (err) {
        console.log(err);
    }
};

const PostsModel = mongoose.model("Posts", postsSchema)

module.exports = PostsModel