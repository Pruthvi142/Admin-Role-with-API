const Users=require("../models/Users")
require('dotenv').config()
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const adminCltr={}
adminCltr.register=(req,res)=>{
    const body=req.body
    console.log("users",body)
    const user=new Users(body)
    console.log("model",user)
    Users.find({role:'admin'})
        .then((users)=>{
            console.log("find",users)
             if(users.length==0)
             {
                   console.log("id",user)
                 user.role="admin"
                 user.save()
                   .then((result)=>{
                       console.log("res", result)
                       res.json(result)
                   })
                   .catch((err)=>{
                       res.json(err)
                   })
             }
             else 
             {
                 res.json({erros:"admin already there"})
             }
        })
}
adminCltr.login=(req,res)=>{
    const body=req.body
     Users.findOne({email:body.email})
        .then((user)=>{
            if(user)
            {
                 bcrypt.compare(body.password,user.password)
                   .then((result)=>{
                       if(result)
                       {
                            const formData={
                                 id:user._id
                            }
                            const token=jwt.sign(formData,'process.env.screctKey',{expiresIn:"1d"})
                             res.json({token:token})
                       }
                       else
                       {
                           res.json({errros:"invalid email or passeword "})
                       }
                   })
            }
            else{
                res.json({errors:"inavlid email or password"})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
    

}
adminCltr.account=(req,res)=>{
    console.log("acc",req.user)
      res.json(req.user)
}
module.exports=adminCltr