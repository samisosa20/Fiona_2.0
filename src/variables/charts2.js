import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";
import API from "./API";

//color donuht
let colorDonuht = [
  "#5f76e8",
  "#ff4f70",
  "#01caf1",
  "#ff7f0e",
  "#ffbb78",
  "#2ca02c",
  "#98df8a",
  "#d62728",
  "#ff9896",
  "#9467bd",
  "#c5b0d5",
  "#8c564b",
  "#c49c94",
  "#e377c2",
  "#f7b6d2",
  "#7f7f7f",
  "#c7c7c7",
  "#bcbd22",
  "#dbdb8d",
  "#17becf",
  "#9edae5",
];
let idc = sessionStorage.getItem("IdUser");
let divi = sessionStorage.getItem("Divisa");

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

function Chart_Ingresos(props) {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  // grafico de ingresos
  useEffect(() => {
    async function getData(idc, divi, Sdate, Edate) {
      try {
        await API.post("grafic", {
          id: 1,
          idc: idc,
          divi: divi,
          Sdate: Sdate,
          Edate: Edate,
        }).then((res) => {
          if (chartContainer && chartContainer.current) {
            let label = [];
            let value = [];
            res.data.map(
              (data) => (label.push(data.categoria), value.push(data.cantidad))
            );
            let newChartInstance = new Chartjs(chartContainer.current, {
              type: "doughnut",
              data: {
                labels: label, //["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [
                  {
                    label: "Ingresos",
                    data: value,
                    backgroundColor: colorDonuht,
                    borderColor: colorDonuht,
                  },
                ],
              },
              options: {
                borderWidth: 1,
                cutoutPercentage: 83,
                title: "Ingresos",
                width: 25,
                responsive: true,
                legend: {
                  display: false,
                },
                legendCallback: function (chart) {
                  var data = chart.data;
                  var content = "";

                  data.labels.forEach(function (label, index) {
                    var bgColor = data.datasets[0].backgroundColor[index];

                    content += '<span class="chart-legend-item">';
                    content +=
                      '<i class="chart-legend-indicator" style="background-color: ' +
                      bgColor +
                      '"></i>';
                    content += formatter.format(label);
                    content += "</span>";
                  });

                  return content;
                },
              },
            });
            setChartInstance(newChartInstance);
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
    getData(idc, divi, props.dstart, props.dend);
  }, [chartContainer]);

  return <canvas ref={chartContainer} />;
}

function Chart_Egreso(props) {
  const chartContainerEgre = useRef(null);
  const [chartInstanceEgre, setChartInstanceEgre] = useState(null);

  // grafico de Egresos
  useEffect(() => {
    async function getDataExpenses(idc, divi, Sdate, Edate) {
      try {
        await API.post("grafic", {
          id: 2,
          idc: idc,
          divi: divi,
          Sdate: Sdate,
          Edate: Edate,
        }).then((res) => {
          if (chartContainerEgre && chartContainerEgre.current) {
            let label = [];
            let value = [];
            res.data.forEach(
              (data) => (label.push(data.categoria), value.push(data.cantidad))
            );
            let newChartInstanceEgre = new Chartjs(chartContainerEgre.current, {
              type: "doughnut",
              data: {
                labels: label, //["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [
                  {
                    label: "Egresos",
                    data: value,
                    backgroundColor: colorDonuht,
                    borderColor: colorDonuht,
                  },
                ],
              },
              options: {
                borderWidth: 1,
                cutoutPercentage: 83,
                title: "Egresos",
                width: 25,
                responsive: true,
                legend: {
                  display: false,
                },
                legendCallback: function (chart) {
                  var data = chart.data;
                  var content = "";

                  data.labels.forEach(function (label, index) {
                    var bgColor = data.datasets[0].backgroundColor[index];

                    content += '<span class="chart-legend-item">';
                    content +=
                      '<i class="chart-legend-indicator" style="background-color: ' +
                      bgColor +
                      '"></i>';
                    content += label;
                    content += "</span>";
                  });

                  return content;
                },
              },
            });
            setChartInstanceEgre(newChartInstanceEgre);
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
    getDataExpenses(idc, divi, props.dstart, props.dend);
  }, [chartContainerEgre]);

  return <canvas ref={chartContainerEgre} />;
}

function Chart_Ahorros(props) {
  const chartContainerEgre = useRef(null);
  const [chartInstanceEgre, setChartInstanceEgre] = useState(null);

  // grafico de Egresos
  useEffect(() => {
    async function getDataSaving(idc, divi, Sdate, Edate) {
      try {
        await API.post("grafic", {
          id: 3,
          idc: idc,
          divi: divi,
          Sdate: Sdate,
          Edate: Edate,
        }).then((res) => {
          if (chartContainerEgre && chartContainerEgre.current) {
            let label = [];
            let value = [];
            res.data.map(
              (data) => (label.push(data.nombre), value.push(data.cantidad))
            );
            let newChartInstanceEgre = new Chartjs(chartContainerEgre.current, {
              type: "doughnut",
              data: {
                labels: label, //["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [
                  {
                    label: "Ahorros",
                    data: value,
                    backgroundColor: colorDonuht,
                    borderColor: colorDonuht,
                  },
                ],
              },
              options: {
                borderWidth: 1,
                cutoutPercentage: 83,
                title: "Ahorros",
                width: 25,
                responsive: true,
                legend: {
                  display: false,
                },
                legendCallback: function (chart) {
                  var data = chart.data;
                  var content = "";

                  data.labels.forEach(function (label, index) {
                    var bgColor = data.datasets[0].backgroundColor[index];

                    content += '<span class="chart-legend-item">';
                    content +=
                      '<i class="chart-legend-indicator" style="background-color: ' +
                      bgColor +
                      '"></i>';
                    content += formatter.format(label);
                    content += "</span>";
                  });

                  return content;
                },
              },
            });
            setChartInstanceEgre(newChartInstanceEgre);
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
    getDataSaving(idc, divi, props.dstart, props.dend);
  }, [chartContainerEgre]);

  return <canvas ref={chartContainerEgre} />;
}

export { Chart_Ingresos, Chart_Egreso, Chart_Ahorros };
