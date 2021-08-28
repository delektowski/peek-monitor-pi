const BME280 = require("bme280-sensor");
const axios = require("axios");

// The BME280 constructor options are optional.

const options = {
    i2cBusNo: 1, // defaults to 1
    i2cAddress: BME280.BME280_DEFAULT_I2C_ADDRESS(), // defaults to 0x77
};

const bme280 = new BME280(options);

// Read BME280 sensor data

const readSensorData = async () => {
    try {
        const data = await bme280.readSensorData();
        let sensorData = {
            temperature: +(data && data.temperature_C),
            humidity: +(data && data.humidity),
            pressure: +(data && data.pressure_hPa),
            measurementDate: new Date(),
        };
        const createTable = await axios.post(
            "http://192.168.191.239:1410/createTable"
        );
        const saveSensorsData = await axios.post(
            "http://192.168.191.239:1410/sensorsData",
            sensorData
        );
        console.log("saveSensorsData status", saveSensorsData.status);
    } catch (err) {
        console.log("Something went wrong: ", err);
    }
};

// Initialize the BME280 sensor

const startSensor = () =>
    bme280
        .init()
        .then(() => {
            console.log("BME280 initialization succeeded");
            setInterval(readSensorData, 60000);
        })
        .catch((err) => console.error(`BME280 initialization failed: ${err} `));

module.exports = startSensor;
