const mongooes=require("mongoose")
const configureDb=()=>{
    mongooes.connect('mongodb://localhost:27017/adminRole',{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{
        console.log("connectd Db")
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports=configureDb