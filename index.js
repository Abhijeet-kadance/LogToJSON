const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");
const fs = require("fs");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    
})

app.get("/json", (req, res) => {


    fs.readFile("./test.txt", (err, data) => {
      if (err) throw err;
  
      //Convert Content to String Format 
      let text = data.toString();
  
      // First Line of Data is URL do extract URL from 1st Line 
      var firstLine = text.split("\n").shift(); // first line
  
      // Removed #URL from !st Line to add to JSON
      let EditedURL = firstLine.replace("#URL => ", "");
      
      //Extract all Content Except First Line 
      var linesExceptFirst = text.split("\n").slice(1).join("\n");
      
      //Remove all Line Break and Make multi-Line content to single Line Content
      let SingleLineData = linesExceptFirst.replace(/(\r\n|\n|\r)/gm, "");
  
      // Createad Json Object to append to final File
      const jsonData = {
        url: EditedURL,
        data: SingleLineData,
      };
  
      console.log(jsonData);
  
    });
  });
  

app.listen('3001',()=>{
    console.log("Listing at port 3001")
})