// const express  = require('express')
// const  User = require('../model/postModel')


// const postRouter = express.Router()

// postRouter.post('/post',async(req,res)=>{
//     console.log(res.query.password)
//     try{
//         if(req.query.password !=="123")
//         {
//             res.send("invaild token")
//         }
//         res.send("successful")
//     }
//     catch(err)
//     {
//         res.send(err)
//     }
   
    
// })

// module.exports = postRouter

const express = require('express')
const Poster = require('../model/postModel')
const jwt = require('jsonwebtoken')
const postrouter  = express.Router()
const middleware = require('../Middleware/auth')
const TypeMiddle = require('../Middleware/Type')


postrouter.post("/add",TypeMiddle,middleware,async(req,res)=>{
    
    try {
        const {title,content,userId,username} = req.body;
        const post = new Poster({
            title:title,content,creator:req.userId,name :req.username
        })
         await post.save()
         await post.populate('creator')
        res.json({"msg":"user data successfully added", 'post':post})
        
    } catch (error) {
        res.status(500).send(error)
    }
})

postrouter.get('/',async(req,res)=>{
    try {
       let posts = await Poster.find()
       
       res.send(posts)
    } catch (error) {
       res.status(500).send(error)
    }
 })
postrouter.get('/search',async(req,res)=>{
    try {
        const {q} = req.query;
        const title = new RegExp(q,"i")
       let posts = await Poster.find({title})
       
       res.send(posts)
    } catch (error) {
       res.status(500).send(error)
    }
 })


postrouter.patch('/update/:id',middleware,async(req,res)=>{
    try {
        const post = await Poster.findOne({_id:req.params.id})
        // console.log(post)
        // console.log(post.creator.toString(),req.userId)
        
        if( post.creator.toString() !== req.userId ){
            res.send('you are not allowed to update the post')
        }
        const UpdatedPost = await Poster.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
       res.send(UpdatedPost)
       
    } catch (error) {
       res.status(500).send(error)
    }
 })
postrouter.patch('/like/:id',middleware,async(req,res)=>{
    try {
        const post = await Poster.findById({_id:req.params.id})
        // console.log(post)
        // console.log(post.creator.toString(),req.userId)
        
       const index = post.likes.findIndex(ele=> ele === String(req.userId))
       console.log("index:",index)

       if(index==-1){
         post.likes.push(String(req.userId))
       }
       else{
        post.likes = post.likes.filter(id=>id!==String(req.userId))
       }
       const updateDate = await Poster.findByIdAndUpdate({_id:req.params.id},post,{new:true})
       res.send({update:updateDate})
        
    //    console.log(index,req.userId)
    //    if(!index){
    //     post.likes = post.likes.push(req.userId)
    //    }
    //    else{
    //     post.likes = post.likes.filter(id=> id!=req.userId)
    //    }

    //   const newlike =await Poster.findByIdAndUpdate({_id:req.params.id},post,{new:true})
    //   res.send(newlike)
    } catch (error) {
       res.status(500).send("error")
    }
 })
module.exports = postrouter

