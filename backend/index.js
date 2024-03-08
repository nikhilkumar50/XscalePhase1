const express = require("express");
const xlsx = require("xlsx");
const path = require("path");
const cors = require("cors");
const fs = require('fs');

const app = express();
const port = 8000;


const excelFilePath = path.join(__dirname, "downloads", "data.xlsx");
const excelFilePathOutput = path.join(__dirname, "downloads", "output.xlsx");

app.use(express.json());
app.use(cors());



app.post("/api/saveInputCost", (req, res) => {
  try {
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = "Input Costs";

    let worksheet = workbook.Sheets[sheetName];
    if (!worksheet) {
      worksheet = xlsx.utils.json_to_sheet([]);
      xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
    }

    
    const formattedData = [
      { A: "Cost Details" },
      {}, 
      { A: "Key", B: "Value" },
    ];

   
    const inputData = req.body;
    for (const key in inputData) {
      let value = inputData[key];

      
      if (!isNaN(parseFloat(value))) { 
        value = parseFloat(value);
      }  

      formattedData.push({
        A: key,
        B: value
      });
    }

    
    xlsx.utils.sheet_add_json(worksheet, formattedData, {
      origin: "A1",
      skipHeader: false,
    });


    worksheet["!cols"] = [{ width: 30 }, { width: 30 }]; 


    const headerStyle = {
      font: { bold: true },
      fill: { fgColor: { rgb: "FFFF00" } },
      alignment: { horizontal: "center" }
    };

    Object.keys(worksheet).forEach((key) => {
      if (key !== "!ref" && key !== "!margins" && key !== "!cols" && key !== "!merges" && key !== "!protect") {
        worksheet[key].s = headerStyle;
      }
    });

    const dataStyle = {
      alignment: { horizontal: "center" }
    };

    formattedData.forEach((row, index) => {
      if (index !== 0 && index !== 1) { 
        Object.keys(row).forEach((key) => {
          const cell = worksheet[key + index];
          if (cell) {
            cell.s = dataStyle;
          }
        });
      }
    });

    xlsx.writeFile(workbook, excelFilePath);
    res.send("Excel file updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating Excel file");  
  }
});

app.post("/api/saveSimulationCost", (req, res) => {
  try {
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = "Simulation Costs";

    let worksheet = workbook.Sheets[sheetName];
    if (!worksheet) {
      worksheet = xlsx.utils.json_to_sheet([]);
      xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
    }

    const formattedData = [
      { A: "Simulation Details" },
      {}, 
      { A: "Key", B: "Value" },
    ];

    const inputData = req.body;
    for (const key in inputData) {
      let value = inputData[key];

      if (!isNaN(parseFloat(value))) { 
        value = parseFloat(value);
      }  

      formattedData.push({
        A: key,
        B: value
      });
    }

    xlsx.utils.sheet_add_json(worksheet, formattedData, {
      origin: "A1",
      skipHeader: false,
    });

    worksheet["!cols"] = [{ width: 30 }, { width: 30 }]; 

    const headerStyle = {
      font: { bold: true },
      fill: { fgColor: { rgb: "FFFF00" } },
      alignment: { horizontal: "center" }
    };

    Object.keys(worksheet).forEach((key) => {
      if (key !== "!ref" && key !== "!margins" && key !== "!cols" && key !== "!merges" && key !== "!protect") {
        worksheet[key].s = headerStyle;
      }
    });

    const dataStyle = {
      alignment: { horizontal: "center" }
    };

    formattedData.forEach((row, index) => {
      if (index !== 0 && index !== 1) { 
        Object.keys(row).forEach((key) => {
          const cell = worksheet[key + index];
          if (cell) {
            cell.s = dataStyle;
          }
        });
      }
    });

    xlsx.writeFile(workbook, excelFilePath);
    res.send("Excel file updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating Excel file");  
  }
});


app.get("/api/excel-data", (req, res) => {
  try {
    
    fs.readFile(excelFilePathOutput, (err, data) => {
      if (err) {
        console.error("Error reading Excel:", err);
        res.status(500).send("Server error");
        return;
      }
      res.contentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.send(data);
    });
  } catch (error) {
    console.error("Error reading Excel:", error);
    res.status(500).send("Server error");
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});