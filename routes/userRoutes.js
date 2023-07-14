// const express  = require('express')
// const  User = require('../model/userModel')
// const bcrypt = require('bcrypt')


// const router = express.Router()

// router.post("/register",async(req,res)=>{

//    const newpassword = await bcrypt.hash(req.body.password,10)
//      try {
//         const user = await User.create({...req.body,password:newpassword})
//         res.send("User created"+user)
//      } catch (error) {
//         res.send (error)
//      }
    
// })
// router.post("/login",async(req,res)=>{

  
//      try {
//       const {username,email,dob,location,role,password} = req.body
      
//       const user = await User.findOne({username})
//         if(!user){
//          res.send("Sign up first")
//         }

//         const varify = await bcrypt.compare(password,user.password)
//         if(!varify)
//         {
//          res.send('Incorrect password')
//         }
//         const token = jwt.sign( username,"secret7")
//         console.log(token)
//         res.send('hello')
//      } catch (error) {
//         res.send (error)
//      }
    
// })

// module.exports = router
const express = require('express')
const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const secretcode = "secret7"

const router  = express.Router()

router.post('/register',async(req,res)=>{
   
   try {
      const newpassword = await bcrypt.hash(req.body.password,10)
      const user = await User.create({...req.body,password:newpassword})
      res.send(user)
   } catch (error) {
      res.status(500).send("server error")
   }
})
router.post('/login',async(req,res)=>{
   
   try {
      
      const {username,email,dob,location,role,password} = req.body ;
      const user = await User.findOne({username})
      if(!user){
         res.status(401).send("Sign UP frist")
      }
      const varify =  await bcrypt.compare(password,user.password)
      if(!varify)
      {
         res.send("password is incorrect")
      }
      const token = jwt.sign({userId:user._id,username:user.username},secretcode)
      res.send({token})
   } catch (error) {
      
      res.status(500).send("server error")
   }
})

router.get('/',async(req,res)=>{
   try {
      const user = await User.find()
      res.send(user)
   } catch (error) {
      res.status(500).send(error)
   }
})

module.exports = {router,secretcode}

