const TEMPERATURE = "temperature";
const PRESSURE = "pressure";
const HUMIDITY = "humidity";
const TEMPERATURE_PL = "temperatura";
const PRESSURE_PL = "ciśnienie";
const HUMIDITY_PL = "wilgotność";
const URL = "http://192.168.191.239:1410/sensorsData";

const green = "rgb(0, 132, 0)";
const blue = "rgb(11,47,227)";
const red = "rgb(132, 0, 0)";

async function getChartData() {
  const response = await fetch(URL);
  return await response.json();
}

async function getSensorData(dataType) {
  const chartData = await getChartData();
  const measurementTimeAndData = chartData.sensorsData.reduce(
    (sum, current) => {
      const hour = new Date(current.measurementDate).getHours();
      const minutes = new Date(current.measurementDate).getMinutes();
      const doubleCharactersHour = hour < 10 ? `0${hour}` : hour;
      const doubleCharactersMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const time = `${doubleCharactersHour}:${doubleCharactersMinutes}`;
      return { ...sum, [time]: current[dataType] };
    },
    {}
  );
  return {
    time: Object.keys(measurementTimeAndData),
    measurement: Object.values(measurementTimeAndData),
  };
}

function getLabel(dataType) {
  if (dataType === TEMPERATURE) {
    return TEMPERATURE_PL;
  }
  if (dataType === PRESSURE) {
    return PRESSURE_PL;
  }
  if (dataType === HUMIDITY) {
    return HUMIDITY_PL;
  }
}

async function init(dataType, color) {
  const getData = await getSensorData(dataType);
  const data = {
    labels: getData.time,
    datasets: [
      {
        label: getLabel(dataType),
        backgroundColor: color,
        borderColor: color,
        data: getData.measurement,
      },
    ],
  };

  const config = {
    type: "line",
    data,
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };
  new Chart(document.getElementById(`${dataType}Chart`), config);
}

init(TEMPERATURE, red);
init(PRESSURE, green);
init(HUMIDITY, blue);
