const BME280 = require("bme280-sensor");
const app = express();
const db = require("./db/sensorsData");

// The BME280 constructor options are optional.
//
const options = {
  i2cBusNo: 1, // defaults to 1
  i2cAddress: BME280.BME280_DEFAULT_I2C_ADDRESS(), // defaults to 0x77
};

const bme280 = new BME280(options);

// Read BME280 sensor data, repeat
//
const readSensorData = () => {
  bme280
    .readSensorData()
    .then((data) => {
      console.log(`data = ${JSON.stringify(data, null, 2)}`);

      let sensorData = {
        temperature: +(data && data.temperature_C),
        humidity: +(data && data.humidity),
        pressure: +(data && data.pressure_hPa),
        measurementDate: new Date(),
      };

      app.post("/sensorsData", async (req, res) => {
        try {
          const results = db.createSensorsData(sensorData);
          console.log("req", req);
          res.status(201).json({ id: results[0] });
        } catch (err) {
          console.log("Error POST: ", err);
        }
      });

      setTimeout(readSensorData, 2000);
    })
    .catch((err) => {
      console.log(`BME280 read error: ${err}`);
      // setTimeout(readSensorData, 2000);
    });
};

// Initialize the BME280 sensor
//
const startBme280Sensor = () =>
  bme280
    .init()
    .then(() => {
      console.log("BME280 initialization succeeded");
      readSensorData();
    })
    .catch((err) => console.error(`BME280 initialization failed: ${err} `));

module.exports = startBme280Sensor;
