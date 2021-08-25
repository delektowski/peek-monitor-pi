const BME280 = require("bme280-sensor");
const axios = require("axios");
const express = require("express");
const app = express();


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

        axios.post('http://192.168.191.239:1410/sensorsData', sensorData)
            .then(function (response) {
                console.log(response);
                app.get("/", async (req, res) => {
                    try {
                        res.render("index", { temperature: sensorData.temperature });
                    } catch (err) {
                        console.log("Display site error23: ", err);
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
            });

    })
    .catch((err) => {
      console.log(`BME280 read error: ${err}`);

    });
};

// Initialize the BME280 sensor
//
const startSensor = () =>
  bme280
    .init()
    .then(() => {
      console.log("BME280 initialization succeeded");
      readSensorData();
    })
    .catch((err) => console.error(`BME280 initialization failed: ${err} `));

module.exports = startSensor
