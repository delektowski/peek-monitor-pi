const express = require("express");
const path = require("path");
const app = express();
const db = require("../db/sensorsData");
const startBme280Sensor = require("./nodeBme280");
const {createTableName} = require("../utils/createTableName");
const port = 1410;

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static("public"));

app.get("/", async (req, res) => {
  try {
    const sensorsData = await db.getAllSensorsData();
    const renderData = {
      temperature: sensorsData[sensorsData.length - 1].temperature,
      pressure: Number(sensorsData[sensorsData.length - 1].pressure).toFixed(2),
      humidity: sensorsData[sensorsData.length - 1].humidity,
    };
    res.render("index", renderData);
  } catch (err) {
    console.log("Display site error: ", err);
  }
});

app.get("/sensorsData", async (req, res) => {
  try {
    const sensorsData = await db.getAllSensorsData();
    res.status(200).json({ sensorsData });
  } catch (err) {
    console.log("Error GET: ", err);
  }
});

app.post("/sensorsData", async (req, res) => {
  try {
    await db.createSensorsData(req.body);
    res.status(200).json(req.body);
  } catch (err) {
    console.log("Error GET: ", err);
  }
});

app.post("/createTable", async (req,res) =>{
  try {
    await db.createTable(createTableName())
    res.status(200).json(req.body);
  } catch (err) {
    console.log("Error GET: ", err);
  }
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  startBme280Sensor();
});
