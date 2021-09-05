const sensorData = {
  sensorsData: [
    {
      id: 1,
      temperature: 18.3,
      pressure: 1024.0638709781433,
      humidity: 66.57882577770532,
      measurementDate: "2021-09-01T22:18:16.288Z",
    },
    {
      id: 2,
      temperature: 18.2,
      pressure: 1024.0911675696507,
      humidity: 66.43214473688913,
      measurementDate: "2021-09-01T22:48:16.288Z",
    },
    {
      id: 3,
      temperature: 18.11,
      pressure: 1024.0973854942797,
      humidity: 66.28100671552508,
      measurementDate: "2021-09-01T23:18:16.288Z",
    },
    {
      id: 4,
      temperature: 18.08,
      pressure: 1024.0412855783843,
      humidity: 65.91497588141029,
      measurementDate: "2021-09-01T23:48:16.289Z",
    },
    {
      id: 5,
      temperature: 17.96,
      pressure: 1023.9831707210301,
      humidity: 65.82314677595846,
      measurementDate: "2021-09-02T00:18:16.287Z",
    },
    {
      id: 6,
      temperature: 17.91,
      pressure: 1024.2347493357458,
      humidity: 65.7752129955336,
      measurementDate: "2021-09-02T00:48:16.289Z",
    },
  ],
};

async function getChartData(chartType) {
  const response = await fetch("http://192.168.191.239:1410/sensorsData");
  const data = await response.json();
  return data;
}

async function temperatureData() {
  const chartData = await getChartData();
  const measurementTimeAndData = chartData.sensorsData.reduce(
    (sum, current) => {
      const hour = new Date(current.measurementDate).getHours();
      const minutes = new Date(current.measurementDate).getMinutes();
      const time = `${hour}:${minutes}`;

      return { ...sum, [time]: current.temperature };
    },
    {}
  );
  return {
    time: Object.keys(measurementTimeAndData),
    measurement: Object.values(measurementTimeAndData),
  };
}

async function init() {
  const tempData = await temperatureData();
  const data = {
    labels: tempData.time,
    datasets: [
      {
        label: "Temperature",
        backgroundColor: "rgb(11,47,227)",
        borderColor: "rgb(11,47,227)",
        data: tempData.measurement,
      },
    ],
  };

  const config = {
    type: "line",
    data,
    options: {},
  };
  new Chart(document.getElementById("temperatureChart"), config);
}

init();
