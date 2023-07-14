const jwt  = require('jsonwebtoken')
const {secretcode} = require('../routes/userRoutes')

   
        
       const middleware  = (req,res,next)=>{
           try {
            const token = req.headers.authorization?.split(' ')[1]
            if(!token){
                res.send("Token has been not provided")
            }
    
           const decoded = jwt.verify(token,secretcode)
            if(!decoded){
                res.send("token is invalid")
            }
            req.userId = decoded.userId
            req.username = decoded.username
            console.log(decoded)
            next()
           } catch (error) {
            res.send(error)
           }
       }

       module.exports = middleware;