//first two charts for part one of the exercis

function createChartForTable1(myChart) {
  const table = document.getElementById("table1");

  const years = Array.from(table.rows[1].cells)
    .slice(2)
    .map((cell) => cell.innerText);
  const countries = [];
  const data = [];

  for (let i = 2; i < table.rows.length; i++) {
    countries.push(table.rows[i].cells[1].innerText);

    const countryData = Array.from(table.rows[i].cells)
      .slice(2)
      .map((cell) => {
        let cellData = cell.innerText;
        return parseFloat(cellData.replace(/,/g, ""));
      });

    data.push(countryData);
  }

  const colors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(128, 0, 0, 0.2)",
    "rgba(0, 128, 0, 0.2)",
    "rgba(0, 0, 128, 0.2)",
    "rgba(255, 0, 255, 0.2)",
    "rgba(0, 255, 255, 0.2)",
  ];

  const canvas1 = document.createElement("canvas");
  canvas1.id = myChart;

  table.parentNode.insertBefore(canvas1, table);

  const ctx = canvas1.getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: countries,
      datasets: years.map((year, index) => {
        return {
          label: year,
          data: data.map((countryData) => countryData[index]),
          backgroundColor: colors[index % colors.length],
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        };
      }),
    },
    options: {
      indexAxis: "y",
      scales: {
        x: {
          beginAtZero: true,
        },
      },
    },
  });
}

function createChartForTable2(visualization1) {
  const table = document.getElementById("table2");

  const labels = [];
  const datasets = [];

  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    const countryName = row.cells[1].innerText;

    labels.push(countryName);

    for (let j = 2; j < row.cells.length; j++) {
      const cellData = parseFloat(row.cells[j].innerText);

      if (i === 1) {
        const setLabel = j === 2 ? "2007-09" : "2010-12";
        datasets.push({
          label: setLabel,
          data: [cellData],
          backgroundColor: `rgba(${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, 0.2)`,
          borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, 1)`,
          borderWidth: 1,
        });
      } else {
        datasets[j - 2].data.push(cellData);
      }
    }
  }

  const canvas2 = document.createElement("canvas");
  canvas2.id = visualization1;

  table.parentNode.insertBefore(canvas2, table);

  const ctx = canvas2.getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

createChartForTable1("myChart");
createChartForTable2("visualization1");

//third chart for the 2nd part of the exercise

const canvas = document.createElement("canvas");
canvas.id = "realTimeChart";
canvas.width = 600;
canvas.height = 400;

const mainTitle = document.querySelector("h1");
mainTitle.insertAdjacentElement("afterend", canvas);

let dataPoints = [];
const ctx = document.getElementById("realTimeChart").getContext("2d");
let myChart;

function fetchDataAndUpdateChart() {
  fetch("https://canvasjs.com/services/data/datapoints.php")
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched Data:", data);
      dataPoints = data;
      updateChart();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function updateChart() {
  console.log("Update Chart with Data:", dataPoints);

  const labels = dataPoints.map((point) => point[0]);
  const values = dataPoints.map((point) => point[1]);

  console.log("Labels:", labels);
  console.log("Values:", values);

  try {
    if (myChart) {
      myChart.destroy();
    }

    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Line 1",
            data: values,
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "linear",
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error initializing Chart:", error);
  }
}

setInterval(fetchDataAndUpdateChart, 1000);
