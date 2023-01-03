import { useState, useEffect } from "react";
import axios from "axios";

import API from "variables/API";

const useReport = () => {
    const [stateDate, setDate] = useState({
        modal: 1,
        Sdate: "",
        Fdate: "",
        hidden: true,
      });
      const [stateData, setData] = useState({
        ResumAco: [],
        TopExp: [],
        Budget: [],
        groupExpensive: [],
        OpenClose: [],
        ClassOpen: "",
        ClassClose: "",
        identify: 0,
      });
      const [dataToExport, setDataToExport] = useState();
      const [stateDataModal, setDataModal] = useState({
        data: [],
        title: "",
        id_modal: 0,
      });
      let idc = localStorage.getItem("IdUser");
      let divi = localStorage.getItem("Divisa");
      const [stateSearch, setSearch] = useState(false);
      const [windowWidth, setWindowWidth] = useState(window.innerWidth);
      /* Declaracion de estados de los modals */
      const [ShowModalMove, setShowModalMove] = useState(false);
    
      // Funciones data modal
      const OpenModalMove = (e, id, cuenta, mes, numberGroup = null) => {
        e.preventDefault();
        API.post(`report`, {
          id: id,
          idc: idc,
          divi: divi,
          acocate: numberGroup ? numberGroup : cuenta,
          fecha_ini: stateDate.Sdate,
          fecha_fin: stateDate.Fdate,
          mouth: mes,
        }).then((res) => {
          if (id !== 12) {
            setDataModal({
              data: res.data,
              title: cuenta,
              id_modal: 0,
              id: id === 16,
            });
          } else {
            setDataModal({ data: res.data, title: cuenta, id_modal: 1 });
          }
        });
        if (!ShowModalMove) {
          ModShowModal();
        }
      };
    
      function getDate(mode = "1") {
        let now = new Date(),
          year,
          month,
          month_now,
          date,
          formattedDateTime,
          formattedDateTimeIni;
        month_now = now.getMonth() + 1;
        month_now = month_now.toString().length === 1 ? "0" + month_now : month_now;
        let d = new Date();
        if (mode === "1") {
          d.setFullYear(now.getFullYear(), month_now, 0);
          year = d.getFullYear();
          month =
            d.getMonth().toString().length === 1
              ? "0" + d.getMonth().toString()
              : d.getMonth();
          date =
            d.getDate().toString().length === 1
              ? "0" + d.getDate().toString()
              : d.getDate();
          formattedDateTime = year + "-" + month_now + "-" + date;
          document.getElementById("Edate").value = formattedDateTime;
    
          if (month_now === 12) {
            d.setFullYear(now.getFullYear(), month_now - 1, 1);
          }
    
          formattedDateTimeIni = year + "-" + month_now + "-01";
          document.getElementById("Sdate").value = formattedDateTimeIni;
    
          setDate({
            ...stateDate,
            Sdate: formattedDateTimeIni,
            Fdate: formattedDateTime,
            hidden: true,
          });
        } else if (mode === "0") {
          setDate({ ...stateDate, hidden: false });
        } else if (mode === "-1") {
          d.setFullYear(now.getFullYear(), month_now + parseInt(mode), 0);
          year = d.getFullYear();
          month =
            (d.getMonth() + 1).toString().length === 1
              ? "0" + (d.getMonth() + 1).toString()
              : d.getMonth() + 1;
          date =
            d.getDate().toString().length === 1
              ? "0" + d.getDate().toString()
              : d.getDate();
          formattedDateTime = year + "-" + month + "-" + date;
          document.getElementById("Edate").value = formattedDateTime;
          month_now = month;
          date = "01";
          formattedDateTimeIni = year + "-" + month_now + "-" + date;
          document.getElementById("Sdate").value = formattedDateTimeIni;
    
          setDate({
            ...stateDate,
            Sdate: formattedDateTimeIni,
            Fdate: formattedDateTime,
            hidden: true,
          });
        } else if (mode === "12" || mode === "-12") {
          year = mode === "-12" ? now.getFullYear() - 1 : now.getFullYear()
          formattedDateTime = year + "-12-31";
          document.getElementById("Edate").value = formattedDateTime;
          formattedDateTimeIni = year + "-01-01";
          document.getElementById("Sdate").value = formattedDateTimeIni;
    
          setDate({
            ...stateDate,
            Sdate: formattedDateTimeIni,
            Fdate: formattedDateTime,
            hidden: true,
          });
        } else if (mode === "-3") {
          let threeDate = new Date(now.setMonth(now.getMonth()-2));
          const lastYear = threeDate.getFullYear();
          const lastMonth =
          threeDate.getMonth().toString().length === 1
              ? "0" + threeDate.getMonth().toString()
              : threeDate.getMonth();
    
          d.setFullYear(d.getFullYear(), month_now, 0);
          year = d.getFullYear();
          date =
            d.getDate().toString().length === 1
              ? "0" + d.getDate().toString()
              : d.getDate();
    
          formattedDateTime = year + "-" + month_now + "-" + date;
          document.getElementById("Edate").value = formattedDateTime;
    
          formattedDateTimeIni = lastYear + "-" + lastMonth + "-01";
          document.getElementById("Sdate").value = formattedDateTimeIni;
    
          setDate({
            ...stateDate,
            Sdate: formattedDateTimeIni,
            Fdate: formattedDateTime,
            hidden: true,
          });
        } else if (mode === "-6") {
          let sixDate = new Date(now.setMonth(now.getMonth()-5));
          const lastYear = sixDate.getFullYear();
          const lastMonth =
          sixDate.getMonth().toString().length === 1
              ? "0" + sixDate.getMonth().toString()
              : sixDate.getMonth();
    
          d.setFullYear(d.getFullYear(), month_now, 0);
          year = d.getFullYear();
          date =
            d.getDate().toString().length === 1
              ? "0" + d.getDate().toString()
              : d.getDate();
    
          formattedDateTime = year + "-" + month_now + "-" + date;
          document.getElementById("Edate").value = formattedDateTime;
    
          formattedDateTimeIni = lastYear + "-" + lastMonth + "-01";
          document.getElementById("Sdate").value = formattedDateTimeIni;
    
          setDate({
            ...stateDate,
            Sdate: formattedDateTimeIni,
            Fdate: formattedDateTime,
            hidden: true,
          });
        } else {
          d.setFullYear(now.getFullYear(), month_now + parseInt(mode), 0);
          year = d.getFullYear();
          month =
            (d.getMonth() + 1).toString().length === 1
              ? "0" + (d.getMonth() + 1).toString()
              : d.getMonth() + 1;
          date =
            d.getDate().toString().length === 1
              ? "0" + d.getDate().toString()
              : d.getDate();
          formattedDateTime = year + "-" + month_now + "-" + date;
          formattedDateTimeIni = year + "-" + month + "-01";
          document.getElementById("Edate").value = formattedDateTime;
          document.getElementById("Sdate").value = formattedDateTimeIni;
    
          setDate({
            ...stateDate,
            Sdate: formattedDateTimeIni,
            Fdate: formattedDateTime,
            hidden: true,
          });
        }
      }
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      });
      useEffect(() => {
        async function getDataReport(idc, divi) {
          if (stateDate.Sdate === "") {
            getDate("1");
          }
          let Fecha_ini = document.getElementById("Sdate").value;
          let Fehca_fin = document.getElementById("Edate").value;
          await axios
            .all([
              API.post(`report`, {
                id: 1,
                idc: idc,
                divi: divi,
                fecha_ini: Fecha_ini,
                fecha_fin: Fehca_fin,
              }),
              API.post(`report`, {
                id: 5,
                idc: idc,
                divi: divi,
                fecha_ini: Fecha_ini,
                fecha_fin: Fehca_fin,
              }),
              API.post(`report`, {
                id: 11,
                idc: idc,
                divi: divi,
                fecha_ini: Fecha_ini,
                fecha_fin: Fehca_fin,
              }),
              API.post(`report`, {
                id: 13,
                idc: idc,
                divi: divi,
                fecha_ini: Fecha_ini,
                fecha_fin: Fehca_fin,
              }),
              API.post(`acount`, {
                id: 14,
                idc: idc,
                sdate: Fecha_ini,
                edate: Fehca_fin,
              }),
              API.post(`report`, {
                id: 15,
                idc: idc,
                divi: divi,
                fecha_ini: Fecha_ini,
                fecha_fin: Fehca_fin,
              }),
            ])
            .then(
              axios.spread(
                (
                  resumAcount,
                  topExpenses,
                  budget,
                  openClose,
                  dataExport,
                  groupExpensive
                ) => {
                  //console.log(groupExpensive.data)
                  setData({
                    ResumAco: resumAcount.data,
                    TopExp: topExpenses.data,
                    Budget: budget.data,
                    groupExpensive: groupExpensive.data,
                    OpenClose: openClose.data[0],
                    ClassOpen:
                      openClose.data[0] && openClose.data[0].open < 0
                        ? "text-danger"
                        : "text-success",
                    ClassClose:
                      openClose.data[0] && openClose.data[0].end < 0
                        ? "text-danger"
                        : "text-success",
                    identify: 1,
                  });
                  setDataToExport(dataExport.data);
                }
              )
            );
        }
        getDataReport(idc, divi);
        // eslint-disable-next-line
      }, [stateSearch]);
    
      useEffect(() => {
        window.addEventListener("resize", () => {
          setWindowWidth(window.innerWidth);
        });
      }, []);
    
      // Funcion para cambiar de estado de los modals
      const ModShowModal = () => setShowModalMove(!ShowModalMove);
      const consultdate = () => {
        setDate({
          ...stateDate,
          Sdate: document.getElementById("Sdate").value,
          Fdate: document.getElementById("Edate").value,
        });
        setSearch(!stateSearch);
      };
    return {
        getDate,
        stateDate,
        consultdate,
        dataToExport,
        stateData,
        formatter,
        stateSearch,
        OpenModalMove,
        ShowModalMove,
        ModShowModal,
        stateDataModal,
        windowWidth,
    }
}

export default useReport