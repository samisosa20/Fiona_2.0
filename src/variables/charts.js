import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
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
let idc = localStorage.getItem("IdUser");
let divi = localStorage.getItem("Divisa");
let newChartInstanceEgre;
let newChartInstance;
let newChartInstanceSaving;
Chart.register(...registerables);

const ChartIncoming = (props) => {
  const chartContainer = useRef(null);

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
            res.data.forEach((data) => {
              label.push(data.categoria);
              value.push(data.cantidad);
            });
            if (newChartInstance) {
              newChartInstance.destroy();
            }
            newChartInstance = new Chart(chartContainer.current, {
              type: "doughnut",
              data: {
                labels: label,
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
                plugins: { legend: { display: false } },
              },
            });
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
    getData(idc, divi, props.dstart, props.dend);
    // eslint-disable-next-line
  }, [props.upload]);

  return <canvas ref={chartContainer} />;
};

const ChartExpense = (props) => {
  const chartContainerEgre = useRef(null);

  // grafico de Egresos
  useEffect(() => {
    async function getData(idc, divi, Sdate, Edate) {
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
            res.data.forEach((data) => {
              label.push(data.categoria);
              value.push(data.cantidad);
            });
            if (newChartInstanceEgre) {
              newChartInstanceEgre.destroy();
            }
            newChartInstanceEgre = new Chart(chartContainerEgre.current, {
              type: "doughnut",
              data: {
                labels: label,
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
                cutoutPercentage: 65,
                title: "Egresos",
                responsive: true,
                plugins: { legend: { display: false } },
              },
            });
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
    getData(idc, divi, props.dstart, props.dend);
    // eslint-disable-next-line
  }, [props.upload]);
  return <canvas ref={chartContainerEgre} />;
};

const ChartSaving = (props) => {
  const chartContainerSaving = useRef(null);

  // grafico de Egresos
  useEffect(() => {
    async function getData(idc, divi, Sdate, Edate) {
      try {
        await API.post("grafic", {
          id: 3,
          idc: idc,
          divi: divi,
          Sdate: Sdate,
          Edate: Edate,
        }).then((res) => {
          if (chartContainerSaving && chartContainerSaving.current) {
            let label = [];
            let value = [];
            res.data.forEach((data) => {
              label.push(data.nombre);
              value.push(data.cantidad);
            });
            if (newChartInstanceSaving) {
              newChartInstanceSaving.destroy();
            }
            newChartInstanceSaving = new Chart(chartContainerSaving.current, {
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
                plugins: { legend: { display: false } },
              },
            });
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
    getData(idc, divi, props.dstart, props.dend);
    // eslint-disable-next-line
  }, [props.upload]);

  return <canvas ref={chartContainerSaving} />;
};

export { ChartIncoming, ChartExpense, ChartSaving };
