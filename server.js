const express = require("express");
const path = require("path");
const app = express();

const port = 1410;

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static("public"));

app.get("/", async (req, res) => {
  try {
    res.render("index", { value: "mocked value" });
  } catch (err) {
    console.log("Display site error: ", err);
  }
});

app.post("/cars", async (req, res) => {
  try {
    const results = await db.createSensorsData(req.body);
    console.log("req", req);
    res.status(201).json({ id: results[0] });
  } catch (err) {
    console.log("Error POST: ", err);
  }
});

app.get("/cars", async (req, res) => {
  try {
    const cars = await db.getAllSensorsData();
    res.status(200).json({ cars });
  } catch (err) {
    console.log("Error GET: ", err);
  }
});

app.listen(port, () => console.log(`Server is running on port: ${port}`));
