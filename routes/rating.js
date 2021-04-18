const { response } = require('express')
const express = require('express')
const RatingModel = require('../models/rating')
const Router = express.Router()

Router.get("/",async (request, response) => {
    //console.log("listing users")
    //response.send("here is a list of users")
    try {
        const post = await RatingModel.find();
        return response.json(post);
    }
    catch (err) {
        return response.json(err);
    }
})


Router.get("/:id", async(request, response, next) => {
    try {
        const post = await RatingModel.findById(request.params.id).populate("author").populate("onId");
        return response.json(post);
    }
    catch (err) {
        return response.json(err);
    }
})

// Router.get("/:id", (request, response) => {
//     RatingModel.findOne({ _id: request.params.id }, (err, ratingDoc) => {
//         if (!err) return response.json(ratingDoc)
//         response.send("error happened")
//     })
// })

Router.post("/", async(request, response) => {
    // get userDate from body
    // console.log(request.body)
    const ratingData = request.body
    // create new instance from usermodel
    const ratingInstance = new RatingModel({
        rating: ratingData.rating,
        onId: ratingData.onId,
        onModel: ratingData.onModel,
        author: ratingData.author

    })
    console.log(ratingInstance)
    // save user instance into db
    try {
        const saveRating = await ratingInstance.save()
        return response.json(saveRating)
    }
    catch (err) {
        return response.json(err)
    }

    // response.send("user created")
})

Router.delete("/:id", async(request, response) => {
    try {
        const post = await RatingModel.findOneAndRemove(request.params.id);
        return response.json("the post has been deleted successfuly");
    }
    catch (err) {
        return response.json(err);
    }
    // response.send(`user deleted with id = ${request.params.id}`)
})

Router.patch("/:id", async(request, response) => {
    // may be request.body.firstname (as you want to edit)
    try {
        const post = await RatingModel.updateOne({ _id: request.params.id }, { $set: request.body });
        return response.json(post);
    }
    catch (err) {
        return response.json(err);
    }
})

module.exports = Router