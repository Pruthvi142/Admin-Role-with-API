const express=require("express")
const app=express()
const port=6060
const cors=require('cors')
const router=require("./configure/routes")
const configureDb=require("./configure/configureDb")
app.use(cors())
app.use(express.json())
configureDb()
app.use(router)

app.listen(port,()=>{
    console.log("server running on port",port)
})