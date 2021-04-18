const { response } = require('express')
const express = require('express')
const UserModel = require('../models/users')
const Router = express.Router()

Router.get("/", async( request, response) => {
    //console.log("listing users")
    //response.send("here is a list of users")
    try {
        const User = await UserModel.find();
        return response.json(user);
    }
    catch (err) {
        return response.json(err);
    }
})

// Router.get("/:id", (request, response) => {
//     UserModel.findOne({ _id: request.params.id }, (err, userDoc) => {
//         if (!err) return response.json(userDoc)
//         response.send("error happened")
//     })
// })

// Router.get("/:id", (request, response, next) => {
//     UserModel.findById(request.params.id).populate("posts").exec((err, post) => {
//         if (err) return next(err)
//         console.log(post)
//         const userAge = post.getUserAge()
//         console.log("userAge", userAge)
        

//         // const userRate = post.getAvgRating()
//         //console.log("userRate", userRate)
        

//         post.getAvgRating().then((data)=>{
//             // everything is well
//             console.log(data)
//          }).catch((e)=>{
//             // error code
//          })

//          response.json(post)
//     })
// })

Router.get("/:id", async(request, response, next) => {
    try {
        const post = await UserModel.findById(request.params.id).populate("posts");

        const userAge = post.getUserAge()
        console.log("userAge", userAge)

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

Router.post("/", async(request, response) => {
    // get userDate from body
    // console.log(request.body)
    const userData = request.body
    // create new instance from usermodel
    const userInstance = new UserModel({
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        dob: userData.dob,
        gender: userData.gender,
        password: userData.password
    })
    console.log(userInstance)
    // save user instance into db
    try {
        const saveUser = await userInstance.save()
        return response.json(saveUser)
    }
    catch (err) {
        return response.json(err)
    }

    // response.send("user created")
})

Router.delete("/:id", async(request, response) => {
    try {
        const post = await UserModel.findOneAndRemove(request.params.id);
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
        const post = await UserModel.updateOne({ _id: request.params.id }, { $set: request.body });
        return response.json(post);
    }
    catch (err) {
        return response.json(err);
    }
})

module.exports = Router