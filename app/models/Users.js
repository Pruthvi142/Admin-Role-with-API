const {Schema,model}=require('mongoose')
const isEmail=require("validator/lib/isEmail")
const bcrypt=require('bcryptjs')
const userSchema=new Schema({
    username:{
         type:String,
         required:true
    },
    email:{
     type:String,
     required:true,
     unique:true,
     validate:{
           validator:function(value)
           {
                  return isEmail(value)
           },
           message:function()
           {
               return "invalid email type"
           }
         }
    },
     password:{
         type:String,
         required:true,
         maxlength:8
     },
     role:{
        type:String,
       enum:["user","admin"],

   }
    
},{timestamps:true})
userSchema.pre('save',function(next){
    const user=this
    bcrypt.genSalt()
      .then((result)=>{
           bcrypt.hash(user.password,result)
               .then((encrypted)=>{
                     user.password=encrypted
                     next()
               })
      })
})
module.exports=model("User",userSchema)