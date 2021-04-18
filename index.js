const express = require('express')
const mongoose = require("mongoose")
const userRouter = require("./routes/users")
const postRouter = require("./routes/posts")
const ratingRouter = require("./routes/rating")
const jwt = require('jsonwebtoken');

mongoose.connect("mongodb://localhost:27017/blogApp", {
    useNewUrlParser: true
} ,(err) => {
    if (err) return console.error(err)
    console.log("connected to db")

})
const app = express()

app.get('/api', (req, res) =>{
    res.json({
      message:"Welcome to the app"
    })
})
 
app.post('/api/articles', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if(err){
        res.sendStatus(403)
      }else {
        res.json({
          message: "Article created...",
          authData
        })
      }
    })
})
 
app.post('/api/login', verifyToken,(req, res) => {
    const user = {
      id:1,
      username: 'Ahmed',
      email: 'ahmedibrahem@gmail.com'
    }
    jwt.sign({user}, 'secretkey', (err, token) => {
      res.json({token})
    });
})
 
function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else{
      res.sendStatus(403);
    }
}

app.use(express.json())
app.use("/users",userRouter)
app.use("/posts",postRouter)
app.use("/ratings",ratingRouter)

app.listen(3000, (err) =>{
    if (err) return console.log(err)
    console.log("started server on port 3000")
})
