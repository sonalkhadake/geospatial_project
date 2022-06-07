
const express = require("express");
const router = express.Router();
const excelModel = require("../models/excel");
const Multer = require("multer");
const XLSX = require("xlsx");
const Path = require("path");
const BodyParser = require("body-parser");
const storage = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = Multer({ storage: storage });
//////////////////////
router.get("/getexcelData", (req, res) => {
  excelModel.find((err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data != "") {
        res.json({ result: data });
      } else {
        res.json({ result: {} });
      }
    }
  });
});
////////////////////////////
router.post("/postexcelData", upload.single("excel"), (req, res) => {
  var workbook = XLSX.readFile(req.file.path);
  var sheet_namelist = workbook.SheetNames;
  var x = 0;
  sheet_namelist.forEach((element) => {
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
    excelModel.insertMany(xlData, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        // res.json({ data: data });
      }
    });
    x++;
  });
 
////////////////////////
router.delete("/deleteExcelData/:id", async(req,res)=>{
  // const body = req.body
  // const id = req.body._id
  try{
    const id = req.params.id
    console.log(id)
        const data = await excelModel.findById({id})
        if(!data){
          return res.status(404).json({message:"data not found"})
        }
        data = await excelModel.deleteOne(id);
        res.json({message:"data has been deleted successfully"})
  }
  catch(error){
    console.log(error)
    res.json({message:"Intenal server error"})

  }

} )
});

module.exports = router;