const User = require("../models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_key = "sdfghjkla@$%&";
const nodemailer = require("nodemailer");



/////////send mail function/////
const sendmail = async(name, email, id) => {
 
    let mailTranspoter = nodemailer.createTransport({
        service:"gmail",
        port:"25",
        secure: true, // use SSL
        auth:{
            user:"sonalkhadake@gmail.com",
            pass:"binhxbvadzpyolnq"
        }
    })
    let datails ={
        from: "sonalkhadake@gmail.com",
        to:email,
        subject:"please verify user account",
        html:'<p> Hii '+name+', please click here to <a href="http://localhost:8000/verifyMail?id='+id+'"> verify </a>your mail and other details</p>'
    }
    mailTranspoter.sendMail(datails,(err)=>{
        if(err){
            console.log("it has an err",err)
        }
        else{
            console.log("email has been sent")
        }
    })
    }

////////signUp/////
const signUp = async (req,res)=>{
    try {
     
        let createUser = await User.findOne({ email: req.body.email });
        if (createUser) {
          return res
            .status(400)
            .json({ success: false, message: "the user is already exist" });
        }
        const password = req.body.password;
        const salt = bcrypt.genSaltSync(5);
        const hash = bcrypt.hashSync(password, salt);
  
        createUser = await new User({
          name: req.body.name,
          // company_name: req.body.company_name,
          // mobile_number: req.body.mobile_number,
          email: req.body.email,
          password: hash,
        });
        createUser.save();
        //   console.log(req.body);
        if(createUser){
            // sendmail(req.body.name, req.body.email, createUser.id)
           return res.json({  message:"user is created successfully", data:createUser}) 
         }
        // res.json({ message: "succesfully created User", data: createUser });
      } catch (error) {
        console.log(error);
        res.status(500).send("internal server error");
      }
}

////////signIn///////
const signIn = async (req,res)=>{
    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email: email,
      });
      if (!user) {
        return res
          .status(200)
          .json({ success: false, message: "Please enter registered email" });
      }
      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        return res
          .status(401)
          .json({ success: false, message: "incorrect Password" });
      }
      const payload = {
        user: {
          id: user._id,
        },
      };
      const authtoken = jwt.sign(payload, jwt_key);

      res.json({
        success:true,
        message: "Token created succesfully",
        data: authtoken,
      });
      console.log(authtoken);
    } catch (error) {
      console.log(error);
      res.status(500).send("internal server error");
    }

}
/////////getallusers/////

const getUser= async (req,res)=>{
    try {
        const user_id = req.user.id;
        const user = await User.findById(user_id);
        res.json({ message: "success", data: user });
      } catch (error) {
        console.error(error);
        res.status(500).send("internal server error");
      }
}
//////
const verifyMail =async(req,res)=>{
    try{
     
        const data = await User.findByIdAndUpdate(req.params.id, { $set: is_Varified =1 })
        res.json(data)
    }
    catch(err){
    console.log(err)
    res.status(200).send({message:err.message})
    }
}

module.exports={
    signUp,
    signIn,
    getUser,
    verifyMail
}