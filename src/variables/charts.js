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
let newChartInstanceBalance;
let newChartInstanceCashFlow;
Chart.register(...registerables);

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});


let width, height, gradient;
function getGradient(ctx, chartArea, color = "primary") {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    if(color === "primary"){
      gradient.addColorStop(1, 'rgba(1,202,241,1)');
      gradient.addColorStop(0, 'rgba(1,202,241, 0)');
    } else if(color === "success") {
      gradient.addColorStop(1, 'rgba(152,223,138,1)');
      gradient.addColorStop(0, 'rgba(152,223,138, 0)');
    } else if (color === "danger") {
      gradient.addColorStop(1, 'rgba(255,79,112,1)');
      gradient.addColorStop(0, 'rgba(255,79,112, 0)');
    }
  }

  return gradient;
}

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

const ChartBalance = (props) => {
  const chartContainerBalance = useRef(null);

  // grafico de Egresos
  useEffect(() => {
    async function getData(idc, divi, Sdate, Edate) {
      try {
        await API.post("report", {
          id: 17,
          idc: idc,
          divi: divi,
          fecha_ini: Sdate,
          fecha_fin: Edate,
        }).then((res) => {
          //console.log(res);
          if (chartContainerBalance && chartContainerBalance.current) {
            let label = [];
            let value = [];
            res.data.forEach((data) => {
              label.push(data.date);
              value.push(data.cumulative_sum);
            });
            if (newChartInstanceBalance) {
              newChartInstanceBalance.destroy();
            }
            newChartInstanceBalance = new Chart(chartContainerBalance.current, {
              type: "line",
              data: {
                labels: label,
                datasets: [
                  {
                    label: "Balance",
                    data: value,
                    borderColor: colorDonuht[2],
                    fill: true,
                    backgroundColor : function(context) {
                      const chart = context.chart;
                      const {ctx, chartArea} = chart;
              
                      if (!chartArea) {
                        // This case happens on initial chart load
                        return;
                      }
                      return getGradient(ctx, chartArea);
                    },
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
                scales: {
                  y: {
                      ticks: {
                          callback: function(value, index, values) {
                            const label = formatter.format(value > 1000000 ? value / 1000000 : value > 1000 ? value / 1000 : value)
                              return value > 1000000 ? label + 'M' : value > 1000 ? label + 'K' : label ;
                          }
                      }
                  }
              }
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

  return <canvas ref={chartContainerBalance} />;
};

const ChartCashFlow = (props) => {
  const chartContainerChasFlow = useRef(null);

  // grafico de Egresos
  useEffect(() => {
    async function getData(idc, divi, Sdate, Edate) {
      try {
        await API.post("report", {
          id: 18,
          idc: idc,
          divi: divi,
          fecha_ini: Sdate,
          fecha_fin: Edate,
        }).then((res) => {
          //console.log(res);
          if (chartContainerChasFlow && chartContainerChasFlow.current) {
            let label = [];
            let value = [];
            res.data.forEach((data) => {
              label.push(data.date);
              value.push(data.valor);
            });
            console.log(label)
            if (newChartInstanceCashFlow) {
              newChartInstanceCashFlow.destroy();
            }
            newChartInstanceCashFlow = new Chart(chartContainerChasFlow.current, {
              type: "bar",
              data: {
                labels: label,
                datasets: [
                  {
                    label: "Cash Flow",
                    data: value,
                    borderColor: function(context) {
                      const chart = context.chart;
                      const {chartArea} = chart;
              
                      if (!chartArea) {
                        // This case happens on initial chart load
                        return;
                      }
                      return parseInt(context.raw) < 0 ? "#ff4f70" : "#98df8a";
                    },
                    fill: true,
                    backgroundColor : function(context) {
                      const chart = context.chart;
                      const { chartArea} = chart;
              
                      if (!chartArea) {
                        // This case happens on initial chart load
                        return;
                      }
                      return parseInt(context.raw) < 0 ? "#ff4f70" : "#98df8a";
                      //return getGradient(ctx, chartArea, parseInt(context.raw) < 0 ? "danger" : "success");
                    },
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
                scales: {
                  y: {
                      ticks: {
                          callback: function(value, index, values) {
                            const label = formatter.format(value >= 1000000 || value <= -1000000 ? value / 1000000 : value >= 1000 || value <= -1000 ? value / 1000 : value)
                              return value >= 1000000 || value <= -1000000 ? label + 'M' : value >= 1000 || value <= -1000 ? label + 'K' : label ;
                          }
                      }
                  }
              }
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

  return <canvas ref={chartContainerChasFlow} />;
};

export { ChartIncoming, ChartExpense, ChartSaving, ChartBalance, ChartCashFlow };
