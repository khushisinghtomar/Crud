const express = require("express")
const app = express()
const bodyParser = require('body-parser')
require("./src/database/connection");

app.use(bodyParser.json())   //global middleware
const candidateRoute = require("./src/router/candidateRoute")


app.use('/candidate' , candidateRoute)

//test api
app.get('/khushi',function(req,res){
    res.send("Hello world")
})
app.listen(8000,()=>{
    console.log("connected to server port 8000")
})

