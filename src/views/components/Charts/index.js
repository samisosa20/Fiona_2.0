import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";


import API from "variables/API";

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
let newChartInstanceBalanceComparison;
let newChartInstanceCashFlow;
Chart.register(...registerables);

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

let width, height, gradient;
function getGradient(ctx, chartArea, color) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    if (color === "primary") {
      gradient.addColorStop(1, "rgba(1,202,241,1)");
      gradient.addColorStop(0, "rgba(1,202,241, 0)");
    } else if (color === "success") {
      gradient.addColorStop(1, "rgba(152,223,138,1)");
      gradient.addColorStop(0, "rgba(152,223,138, 0)");
    } else if (color === "danger") {
      gradient.addColorStop(1, "rgba(255,79,112,1)");
      gradient.addColorStop(0, "rgba(255,79,112, 0)");
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
            const label = new Array(res.data.length).fill("");
            const value = new Array(res.data.length).fill("");

            res.data.forEach((data, i) => {
              label.splice(i, 1, data.categoria);
              value.splice(i, 1, data.cantidad);
            });

            if (newChartInstance) {
              newChartInstance.destroy();
            }
            newChartInstance = new Chart(chartContainer.current, {
              type: "bar",
              data: {
                labels: label,
                datasets: [
                  {
                    data: value,
                    backgroundColor: colorDonuht,
                    borderColor: colorDonuht,
                    borderRadius: 6,
                    pointRadius: 0,
                  },
                ],
              },
              options: {
                indexAxis: "y",
                // Elements options apply to all of the options unless overridden in a dataset
                // In this case, we are setting the border of each horizontal bar to be 2px wide
                elements: {
                  bar: {
                    borderWidth: 2,
                  },
                },
                responsive: true,
                scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      ticks: {
                        color: 'white'
                      }
                    }
                },
                plugins: {
                  legend: {
                    position: "right",
                    display: false,
                  },
                  title: {
                    display: false,
                  },
                },
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
            const label = new Array(res.data.length).fill("");
            const value = new Array(res.data.length).fill("");

            res.data.forEach((data, i) => {
              label.splice(i, 1, data.categoria.substring(0,10));
              value.splice(i, 1, data.cantidad);
            });
            if (newChartInstanceEgre) {
              newChartInstanceEgre.destroy();
            }
            newChartInstanceEgre = new Chart(chartContainerEgre.current, {
              type: "bar",
              data: {
                labels: label,
                datasets: [
                  {
                    data: value,
                    backgroundColor: colorDonuht,
                    borderColor: colorDonuht,
                    borderRadius: 6,
                    pointRadius: 0,
                  },
                ],
              },
              options: {
                indexAxis: "y",
                // Elements options apply to all of the options unless overridden in a dataset
                // In this case, we are setting the border of each horizontal bar to be 2px wide
                elements: {
                  bar: {
                    borderWidth: 2,
                    lineWidth: 5,
                  },
                },
                responsive: true,
                scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      ticks: {
                        color: 'white'
                      }
                    },
                },
                plugins: {
                  legend: {
                    position: "right",
                    display: false,
                  },
                  title: {
                    display: false,
                  },
                },
                onClick: (e) => {
                  console.log("click function", e)
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
          if (chartContainerBalance && chartContainerBalance.current) {
            let label = [];
            let valueBalance = [];
            res.data.forEach((data) => {
              label.push(data.date);
              valueBalance.push(data.cumulative_sum);
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
                    data: valueBalance,
                    borderColor: colorDonuht[2],
                    fill: true,
                    tension: 0.2,
                    backgroundColor: function (context) {
                      const chart = context.chart;
                      const { ctx, chartArea } = chart;

                      if (!chartArea) {
                        // This case happens on initial chart load
                        return;
                      }
                      return getGradient(ctx, chartArea, "primary");
                    },
                  },
                ],
              },
              options: {
                borderWidth: 2,
                title: "Balance per day",
                width: 25,
                responsive: true,
                plugins: { legend: { display: false } },
                /* elements: {
                  point: {
                    radius: 0,
                  },
                }, */
                scales: {
                  y: {
                    ticks: {
                      callback: function (value) {
                        const label = formatter.format(
                          value >= 1000000 || value <= -1000000
                            ? value / 1000000
                            : value >= 1000 || value <= -1000
                            ? value / 1000
                            : value
                        );
                        return value >= 1000000 || value <= -1000000
                          ? label + "M"
                          : value >= 1000 || value <= -1000
                          ? label + "K"
                          : label;
                      },
                      color: "white",
                    },
                  },
                  x: {
                    ticks: {
                      callback: function (val, index) {
                        if (valueBalance.length > 20) {
                          return (index % 10 === 0 &&
                            index !== valueBalance.length - 2) ||
                            index === valueBalance.length - 1
                            ? this.getLabelForValue(val)
                            : ""; // Show each 10 data
                        } else if (valueBalance.length > 10) {
                          return (index % 4 === 0 &&
                            index !== valueBalance.length - 2) ||
                            index === valueBalance.length - 1
                            ? this.getLabelForValue(val)
                            : ""; // Show each 4 data
                        } else if (valueBalance.length > 5) {
                          return (index % 2 === 0 &&
                            index !== valueBalance.length - 2) ||
                            index === valueBalance.length - 1
                            ? this.getLabelForValue(val)
                            : ""; // Show each 4 data
                        } else {
                          return this.getLabelForValue(val);
                        }
                      },
                      color: "white",
                    },
                  },
                },
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
            if (newChartInstanceCashFlow) {
              newChartInstanceCashFlow.destroy();
            }
            newChartInstanceCashFlow = new Chart(
              chartContainerChasFlow.current,
              {
                type: "bar",
                data: {
                  labels: label,
                  datasets: [
                    {
                      label: "Cash Flow",
                      data: value,
                      borderColor: false,
                      fill: true,
                      backgroundColor: function (context) {
                        const chart = context.chart;
                        const { chartArea } = chart;

                        if (!chartArea) {
                          // This case happens on initial chart load
                          return;
                        }
                        return parseInt(context.raw) < 0
                          ? colorDonuht[1]
                          : colorDonuht[6];
                        //return getGradient(ctx, chartArea, parseInt(context.raw) < 0 ? "danger" : "success");
                      },
                    },
                  ],
                },
                options: {
                  title: "Cash Flow",
                  width: 25,
                  responsive: true,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: {
                      ticks: {
                        callback: function (value) {
                          const label = formatter.format(
                            value >= 1000000 || value <= -1000000
                              ? value / 1000000
                              : value >= 1000 || value <= -1000
                              ? value / 1000
                              : value
                          );
                          return value >= 1000000 || value <= -1000000
                            ? label + "M"
                            : value >= 1000 || value <= -1000
                            ? label + "K"
                            : label;
                        },
                        color: "white",
                      },
                    },
                    x: {
                      ticks: {
                        color: "white",
                      },
                    },
                  },
                },
              }
            );
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

const ChartBalanceComparison = (props) => {
  const chartContainerBalanceComparison = useRef(null);

  useEffect(() => {
    async function getData(idc, divi, Sdate, Edate) {
      try {
        await API.post("report", {
          id: 19,
          idc: idc,
          divi: divi,
          fecha_ini: Sdate,
          fecha_fin: Edate,
        }).then((res) => {
          if (
            chartContainerBalanceComparison &&
            chartContainerBalanceComparison.current
          ) {
            let label = [],
              valueCurrent = [],
              valueLast = [],
              valueYear = [];
            res.data.forEach((data) => {
              label.push(data.date);
              valueCurrent.push(data.valueThis);
              valueYear.push(data.valueLast);
              valueLast.push(data.valuePrev);
            });
            if (newChartInstanceBalanceComparison) {
              newChartInstanceBalanceComparison.destroy();
            }
            newChartInstanceBalanceComparison = new Chart(
              chartContainerBalanceComparison.current,
              {
                type: "line",
                data: {
                  labels: label,
                  datasets: [
                    {
                      label: "Current period",
                      data: valueCurrent,
                      borderColor: colorDonuht[2],
                      fill: true,
                      backgroundColor: colorDonuht[2] + "0C",
                      tension: 0.2,
                    },
                    {
                      label: "Last Period",
                      data: valueLast,
                      borderColor: colorDonuht[1],
                      fill: true,
                      backgroundColor: colorDonuht[1] + "0C",
                      tension: 0.2,
                    },
                    {
                      label: "Same period last year",
                      data: valueYear,
                      borderColor: colorDonuht[6],
                      fill: true,
                      backgroundColor: colorDonuht[6] + "0C",
                      tension: 0.2,
                    },
                  ],
                },
                options: {
                  borderWidth: 1.5,
                  title: "Balance comparison",
                  width: 25,
                  responsive: window.innerWidth >= 500,
                  elements: {
                    point: {
                      radius: 0,
                    },
                  },
                  plugins: {
                    legend: {
                      display: window.innerWidth >= 500,
                      labels: {
                        color: "#fff",
                      },
                    },
                  },
                  scales: {
                    y: {
                      ticks: {
                        callback: function (value) {
                          const label = formatter.format(
                            value >= 1000000 || value <= -1000000
                              ? value / 1000000
                              : value >= 1000 || value <= -1000
                              ? value / 1000
                              : value
                          );
                          return value >= 1000000 || value <= -1000000
                            ? label + "M"
                            : value >= 1000 || value <= -1000
                            ? label + "K"
                            : label;
                        },
                        color: "white",
                      },
                    },
                    x: {
                      ticks: {
                        callback: function (val, index) {
                          if (valueCurrent.length > 20) {
                            return (index % 10 === 0 &&
                              index !== valueCurrent.length - 2) ||
                              index === valueCurrent.length - 1
                              ? this.getLabelForValue(val)
                              : ""; // Show each 10 data
                          } else if (valueCurrent.length > 10) {
                            return (index % 4 === 0 &&
                              index !== valueCurrent.length - 2) ||
                              index === valueCurrent.length - 1
                              ? this.getLabelForValue(val)
                              : ""; // Show each 4 data
                          } else if (valueCurrent.length > 5) {
                            return (index % 2 === 0 &&
                              index !== valueCurrent.length - 2) ||
                              index === valueCurrent.length - 1
                              ? this.getLabelForValue(val)
                              : ""; // Show each 4 data
                          } else {
                            return this.getLabelForValue(val);
                          }
                        },
                        color: "white",
                      },
                    },
                  },
                },
              }
            );
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
    getData(idc, divi, props.dstart, props.dend);
    // eslint-disable-next-line
  }, [props.upload, props.resize]);

  return (
    <canvas
      ref={chartContainerBalanceComparison}
      style={{ minHeight: "200px", width: "95%" }}
    />
  );
};

const Charts = () => {
  return {
    ChartIncoming,
    ChartExpense,
    ChartSaving,
    ChartBalance,
    ChartCashFlow,
    ChartBalanceComparison,
  };

}

export default Charts