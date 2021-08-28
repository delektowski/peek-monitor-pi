const BME280 = require("bme280-sensor");
const axios = require("axios");

// The BME280 constructor options are optional.

const options = {
  i2cBusNo: 1, // defaults to 1
  i2cAddress: BME280.BME280_DEFAULT_I2C_ADDRESS(), // defaults to 0x77
};

const bme280 = new BME280(options);

// Read BME280 sensor data, repeat

const readSensorData = () => {
  bme280
    .readSensorData()
    .then((data) => {
      console.log(`data = ${JSON.stringify(data, null, 2)}`);
      axios
        .post("http://192.168.191.239:1410/createTable")
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      // let sensorData = {
      //   temperature: +(data && data.temperature_C),
      //   humidity: +(data && data.humidity),
      //   pressure: +(data && data.pressure_hPa),
      //   measurementDate: new Date(),
      // };
      //
      // axios
      //   .post("http://192.168.191.239:1410/sensorsData", sensorData)
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    })
    .catch((err) => {
      console.log(`BME280 read error: ${err}`);
    });
};

// Initialize the BME280 sensor

const startSensor = () =>
  bme280
    .init()
    .then(() => {
      console.log("BME280 initialization succeeded");
      setInterval(readSensorData, 1800000);
    })
    .catch((err) => console.error(`BME280 initialization failed: ${err} `));

module.exports = startSensor;
