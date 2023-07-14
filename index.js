
// const express = require('express')
// const mongoose = require('mongoose')
// const connection = require('./mongoose')
// const userRouter = require("./routes/userRoutes")
// const postRouter = require("./routes/userRoutes")

// const app = express();
// app.use(express.json())
// app.use('/user',userRouter)
// app.use('/postdata',postRouter)




// app.listen(8080,()=>{
//     connection()
//     console.log('server is running on port 8080')
// })

const express = require('express')
const mongoose = require('mongoose')
const connection = require('./mongoose')
const {router }= require('./routes/userRoutes')
const postroute = require('./routes/postRoutes')
const app  = express()
app.use(express.json())
require('dotenv').config()



app.use('/users',router)
app.use('/post',postroute)


app.listen(8080,()=>{
    connection(process.env.PORT)
    console.log('server is running')
})