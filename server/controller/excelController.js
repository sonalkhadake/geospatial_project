const excelModel= require("../models/excel.js");

const XLSX = require("xlsx");


  const getexcelData = (req,res) =>{
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
  }


  const postexcelData = (req,res)=>{

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
  }

  module.exports ={
    getexcelData,
    postexcelData
  }