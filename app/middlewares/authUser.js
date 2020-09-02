const Users=require("../models/Users")
const jwt=require('jsonwebtoken')
require('dotenv').config()
const authUser=(req,res,next)=>{
    const token=req.headers.authorization
    if(token)
    {
          try
          {
                const formData=jwt.verify(token,'process.env.screctKey')
                Users.findById(formData.id)
                     .then((user)=>{
                         console.log("form",user)
                           req.user=user
                           next()
                     })
          }
          catch(e)
          {
              res.json({errors:e.message})
          }
    }
    else
    {
        res.json({errors:"token must be provide"})
    }

}
module.exports=authUser