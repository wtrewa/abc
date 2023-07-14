

const TypeMiddle = (req,res,next)=>{
      
  const   {title,content,} = req.body;
    console.log(title)
    
    

    typeof title !== "string" ? res.send("Name is not String") : typeof content !== "string" ? res.send("email is not String"): next()


}
 

module.exports = TypeMiddle