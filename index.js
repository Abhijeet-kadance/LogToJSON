const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var JSSoup = require("jssoup").default;
var cors = require("cors");
const fs = require("fs");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/htmltojson", (req, res) => {
  fs.readdir("./docs", function (err, filenames) {
    if (err) {
      // onError(err);
      return;
    }
    console.log(filenames);
    filenames.forEach(function (filename) {
      //console.log(content)
      fs.readFile("docs\\" + filename, "utf-8", (err, data) => {
        if (err) throw err;
        const unsortedHtmlData = data;

        var soup = new JSSoup(unsortedHtmlData);
        var tag = soup.find("title");
        // console.log(tag);
        tag.name = "title";
        console.log("#"+tag.getText());

        var body = soup.find('body');
        console.log("data:"+body.getText())
      });
    });
  });

  //End of API
});

app.get("/storing", (req, res) => {
  function readFiles(callbackFunc) {
    //Function to read directory for filenames
    fs.readdir("./logs", function (err, filenames) {
      if (err) {
        // onError(err);
        return;
      }

      const data1 = [];
      // Traverse the Logs directory and read files inside the directory and store to some Json Object
      filenames.forEach(function (filename) {
        //console.log(content)
        fs.readFile("logs\\" + filename, "utf-8", (err, data) => {
          if (err) throw err;

          //Convert Content to String Format
          let text = data.toString();

          // First Line of Data is URL do extract URL from 1st Line
          var firstLine = text.split("\r\n").shift(); // first line

          // Removed #URL from !st Line to add to JSON
          let EditedURL = firstLine.replace("#URL => ", "");

          //Extract all Content Except First Line
          var linesExceptFirst = text.split("\n").slice(1).join("\n");

          //Remove all Line Break and Make multi-Line content to single Line Content
          let SingleLineData = linesExceptFirst.replace(/(\r\n|\n|\r)/gm, " ");

          // Createad Json Object to append to final File
          const jsonData = {
            url: EditedURL,
            data: SingleLineData,
          };
          data1.push(jsonData);
          const data2 = JSON.stringify(jsonData);
          fs.appendFile("Data.json", data2 + "\n", (err) => {
            // In case of a error throw err.
            if (err) throw err;
          });
          callbackFunc(data1);
        });
      });
    });
  }
  function callbackFunc(result) {
    //console.log("Result ", JSON.stringify(result));
    const data2 = JSON.stringify(result);
    //   fs.writeFile('Data.json', data2, (err) => {

    //     // In case of a error throw err.
    //     if (err) throw err;
    // })
  }
  readFiles(callbackFunc);
});

app.listen("3001", () => {
  console.log("Listing at port 3001");
});
