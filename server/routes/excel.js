const express = require("express");
const router = express.Router();

const Multer = require("multer");
const excelController= require("../controller/excelController")

// const Path = require("path");
// const BodyParser = require("body-parser");
const storage = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = Multer({ storage: storage });

router.get("/getexcelData", (req,res)=>{
   excelController.getexcelData})
   
router.post("/postexcelData", upload.single("excel"), (req,res)=>{
    excelController.postexcelData})



module.exports = router;