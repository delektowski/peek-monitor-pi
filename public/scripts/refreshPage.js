const getTemperatureElement = document.querySelector("#temperature");
const getPressureElement = document.querySelector("#pressure");
const getHumidityElement = document.querySelector("#humidity");
const getupdatedAtElement = document.querySelector("#updatedAt");

function refreshSensorsData(data) {
  if (data && data.sensorsData) {
    const lastData = data.sensorsData[data.sensorsData.length - 1];
    console.log("lastData.pressure", lastData.pressure);
    getTemperatureElement.innerText = lastData.temperature;
    getPressureElement.innerText = parseInt(lastData.pressure);
    getHumidityElement.innerText = parseInt(lastData.humidity);
    getHumidityElement.innerText = parseInt(lastData.humidity);
    getupdatedAtElement.innerText = new Date().toString();
  }
}

function getSensorsData() {
  fetch("http://192.168.191.239:1410/sensorsData")
    .then((resp) => resp.json())
    .then((data) => {
      refreshSensorsData(data);
    });
}

setInterval(getSensorsData, 1000);
