const { response } = require('express')
const express = require('express')
const PostsModel = require('../models/posts')
const Router = express.Router()

Router.get("/", async( request, response) => {
    //console.log("listing users")
    //response.send("here is a list of users")
    try {
        const post = await PostsModel.find();
        return response.json(post);
    }
    catch (err) {
        return response.json(err);
    }
})

Router.get("/:id", async(request, response, next) => {
    try {
        const post = await PostsModel.findById(request.params.id).populate("author");
        return response.json(post);
    }
    catch (err) {
        return response.json(err);
    }
        post.getAvgRating().then((data) => {
            // everything is well
        }).catch((e) => {
            // error code
        })

        
})


// Router.get("/:id", (request, response, next) => {
//     PostsModel.findOne({ _id: request.params.id }, (err, postsDoc) => {
//         if (!err) return response.json(postsDoc)
//         response.send("error happened")
//     })
// })

Router.post("/", async (request, response) => {
    // get userDate from body
    console.log(request.body)
    const postData = request.body
    // create new instance from usermodel
    const postInstance = new PostsModel({
        title: postData.title,
        body: postData.body,
        author: postData.author,
    })
    console.log(postInstance)
    // save user instance into db
    try {
        const savepost = await postInstance.save()
        return response.json(savepost)
    }
    catch (err) {
        return response.json(err)
    }


    // response.send("user created")
})

Router.delete("/:id", async(request, response) => {
    try {
        const post = await PostsModel.findOneAndRemove(request.params.id);
        return response.json("the post has been deleted successfuly");
    }
    catch (err) {
        return response.json(err);
    }
})

Router.patch("/:id", async(request, response) => {
    // may be request.body.firstname (as you want to edit)
    try {
        const post = await PostsModel.updateOne({ _id: request.params.id }, { $set: request.body });
        return response.json(post);
    }
    catch (err) {
        return response.json(err);
    }

})

module.exports = Router