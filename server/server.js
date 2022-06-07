
const express= require("express");
const mongoose=require("mongoose");
const PORT= process.env.PORT || 5000
const app = express();
var cors = require('cors')
const Path = require("path");
const BodyParser = require("body-parser");


///////userroutes/////
const signUp = require("./routes/user")
const signIn= require("./routes/user")
const getUser =  require("./routes/user")
const verifyMail = require("./routes/user")

///////excel data////
const getexcelData = require("./routes/excel")
const postexcelData = require("./routes/excel")

// const cors= require('cors');

// const corsOption={
//     origin:'http://localhost:5000'
// }
// app.use(cors(corsOption));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}));


////////user////
app.use("/api", signUp)////////http://localhost:5000/api/signUp
app.use("/api", signIn)////////http://localhost:5000/api/signIn
app.use("/api", getUser)////////http://localhost:5000/api/getUser
app.use("/api", verifyMail)////////http://localhost:5000/api/verifyMail


// ////////excel sheet///
// app.use("/api", getexcelData)////http://localhost:5000/api/getexcelData
// app.use("/api", postexcelData)////http://localhost:5000/api/postexcelData
app.use("/api", require("./routes/uploadFile"))////http://localhost:5000/api/getexcelData


/////////database connection
mongoose.connect("mongodb+srv://sonali:eiH94uD6klDJR41h@cluster0.wdc5zrs.mongodb.net/?retryWrites=true&w=majority").then(data=>{
    console.log("your server is connected to the database")
}).catch(err=>{
    console.log("connection is fails")
})

app.listen(PORT,()=>{
    console.log("your server is running at port"+PORT)
})
