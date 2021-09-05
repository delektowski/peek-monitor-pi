const getTemperatureElement = document.querySelector("#temperature");
const getPressureElement = document.querySelector("#pressure");
const getHumidityElement = document.querySelector("#humidity");
const getupdatedAtElement = document.querySelector("#updatedAt");

function getDateFormatted() {
  const date = new Date();
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth()+ 1}` : date.getMonth()+ 1;
  const monthDay = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${monthDay}-${month}-${year}`;
}

function refreshSensorsData(data) {
  if (data && data.sensorsData) {
    const lastData = data.sensorsData[data.sensorsData.length - 1];
    getTemperatureElement.innerText = lastData.temperature;
    getPressureElement.innerText = parseFloat(lastData.pressure).toFixed(2);
    getHumidityElement.innerText = parseFloat(lastData.humidity).toFixed(2);
    getupdatedAtElement.innerText = getDateFormatted();
  }
}

function getSensorsData() {
  fetch("http://192.168.191.239:1410/sensorsData")
    .then((resp) => resp.json())
    .then((data) => {
      refreshSensorsData(data);
    });
}

getSensorsData()
setInterval(getSensorsData, 1800000);
